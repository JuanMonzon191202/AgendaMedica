using Microsoft.AspNetCore.Mvc;

using BackEdn.Data;
using BackEdn.Data.backendModels;
using BackEdn.Services;
using System.IO.Pipelines;

namespace BackEdn.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CitaController : ControllerBase
{
    private readonly CitasService _service;

    public CitaController(CitasService service)
    {
        _service = service;
    }

    [HttpGet("citas")]
    public IEnumerable<Cita> Get()
    {
        return _service.GetAll();
    }

    [HttpGet("citas/{id}")]
    public ActionResult<Cita> GetById(int id)
    {
        var citaFind = _service.GetById(id);

        if (citaFind is null)
        {
            return NotFound("Cita no encontrada...");
        }
        return citaFind;
    }

    [HttpGet("citas-user/{id}")]
    public ActionResult<IEnumerable<Cita>> GetAllByUserId(int id)
    {
        var citas = _service.GetAllByUserId(id);

        if (citas == null || !citas.Any())
        {
            return NotFound("No se encontraron citas para el usuario");
        }

        return Ok(citas);
    }

    [HttpGet("citas-especialista/{id}")]
    public ActionResult<IEnumerable<Cita>> GetAllByEspecialistaId(int id)
    {
        var citas = _service.GetAllByEspecialistaId(id);

        if (citas == null || !citas.Any())
        {
            return NotFound("No se encontraron citas para el usuario");
        }

        return Ok(citas);
    }

    [HttpPost("cita")]
    public IActionResult Create(Cita cita)
    {
        var newCita = _service.Create(cita);

        return CreatedAtAction(nameof(GetById), new { id = newCita.Id }, newCita);
    }

    [HttpPut("cita/{id}")]
    public IActionResult Update(int id, Cita cita)
    {
        if (id != cita.Id)
        {
            return BadRequest("El ID proporcionado no coincide con el ID seleccionado.");
        }
        
        var citaToUpdate = _service.GetById(id);

        if(citaToUpdate == null)
        {
            return NotFound($"Cita con ID {id} no encontrado."); 
        }

        _service.Update(cita);
        return NoContent();
    }
}
