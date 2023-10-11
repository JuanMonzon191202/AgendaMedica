using Microsoft.AspNetCore.Mvc;
using BackEdn.Data.backendModels;
using BackEdn.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

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
    public async Task<IEnumerable<Cita>> Get()
    {
        return await _service.GetAllAsync();
    }

    [HttpGet("citas/{id}")]
    public async Task<ActionResult<Cita>> GetById(int id)
    {
        var citaFind = await _service.GetByIdAsync(id);

        if (citaFind is null)
        {
            return NotFound("Cita no encontrada...");
        }
        return citaFind;
    }

    [HttpGet("citas-user/{id}")]
    public async Task<ActionResult<IEnumerable<Cita>>> GetAllByUserId(int id)
    {
        var citas = await _service.GetAllByUserIdAsync(id);

        if (citas == null || !citas.Any())
        {
            return NotFound("No se encontraron citas para el usuario");
        }

        return Ok(citas);
    }

    [HttpGet("citas-especialista/{id}")]
    public async Task<ActionResult<IEnumerable<Cita>>> GetAllByEspecialistaId(int id)
    {
        var citas = await _service.GetAllByEspecialistaIdAsync(id);

        if (citas == null || !citas.Any())
        {
            return NotFound("No se encontraron citas para el usuario");
        }

        return Ok(citas);
    }

    [HttpPost("cita")]
    public async Task<IActionResult> Create(Cita cita)
    {
        var newCita = await _service.CreateAsync(cita);

        return CreatedAtAction(nameof(GetById), new { id = newCita.Id }, newCita);
    }

    [HttpPut("cita/{id}")]
    public async Task<IActionResult> Update(int id, Cita cita)
    {
        if (id != cita.Id)
        {
            return BadRequest("El ID proporcionado no coincide con el ID seleccionado.");
        }

        var citaToUpdate = await _service.GetByIdAsync(id);

        if (citaToUpdate == null)
        {
            return NotFound($"Cita con ID {id} no encontrado.");
        }

        await _service.UpdateAsync(cita);
        return NoContent();
    }
}
