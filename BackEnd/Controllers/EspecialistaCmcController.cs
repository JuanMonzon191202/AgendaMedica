using Microsoft.AspNetCore.Mvc;

using BackEdn.Services;
using BackEdn.Data.backendModels;

namespace BackEdn.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EspecialistaCmcController : ControllerBase
{
    private readonly EspecialistaCmcService _service;

    public EspecialistaCmcController(EspecialistaCmcService service)
    {
        _service = service;
    }

    [HttpGet("especialistas")]
    public IEnumerable<EspecialistaCmc> Get()
    {
        return _service.GetAll();
    }

    [HttpGet("especialistas/{id}")]
    public ActionResult<EspecialistaCmc> GetById(int id)
    {
        var especialistaFind = _service.GetById(id);
        if (especialistaFind is null)
        {
            return NotFound("Especialista no encontrado...");
        }
        return especialistaFind;
    }

    [HttpPost("especialistas")]
    public IActionResult Create(EspecialistaCmc especialistaCmc)
    {
        try
        {
            if (especialistaCmc == null)
            {
                return BadRequest("El objeto especialistaCmc es nulo.");
            }

            var newespecialistaCmc = _service.Create(especialistaCmc);

            if (newespecialistaCmc == null)
            {
                return BadRequest("Error al crear el especialistaCmc.");
            }

            return CreatedAtAction(
                nameof(GetById),
                new { id = newespecialistaCmc.Id },
                newespecialistaCmc
            );
        }
        catch (Exception ex)
        {
            // Log the exception for debugging purposes
            Console.WriteLine($"Error en el método Create: {ex.Message}");

            // Return a 500 Internal Server Error response
            return StatusCode(500, "Se produjo un error interno al crear el especialistaCmc.");
        }
    }

    [HttpPut("especialista")]
    public IActionResult Update(int id, EspecialistaCmc especialistaCmc)
    {
        if (id != especialistaCmc.Id)
        {
            return BadRequest(
                "El ID proporcionado no coincide con el ID del Especialista seleccionado."
            );
        }
        var especialistaCmcToUpdate = _service.GetById(id);

        if (especialistaCmcToUpdate == null)
        {
            return NotFound($"Usuario con ID {id} no encontrado.");
        }
        _service.Update(especialistaCmc);

        return NoContent();
    }
}
