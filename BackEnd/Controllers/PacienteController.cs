using Microsoft.AspNetCore.Mvc;
using BackEdn.Data.backendModels;
using BackEdn.Services;

namespace BackEdn.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PacienteController : ControllerBase
{
    private readonly PacienteService _service;

    public PacienteController(PacienteService service)
    {
        _service = service;
    }

    [HttpGet("paciente")]
    public IEnumerable<Paciente> Get()
    {
        return _service.GetAll();
    }

    [HttpGet("paciente/{id}")]
    public ActionResult<Paciente> GetById(int id)
    {
        var pacienteFind = _service.GetById(id);
        if (pacienteFind is null)
        {
            return NotFound("Paciente no encontrado...");
        }
        return pacienteFind;
    }

    [HttpPost("paciente")]
    public IActionResult Create(Paciente paciente)
    {
        try
        {
            if (paciente == null)
            {
                return BadRequest("El objeto paciente es nulo.");
            }

            var newPaciente = _service.Create(paciente);

            if (newPaciente == null)
            {
                return BadRequest("Error al crear el paciente.");
            }

            return CreatedAtAction(nameof(GetById), new { id = newPaciente.Id }, newPaciente);
        }
        catch (Exception ex)
        {
            // Log the exception for debugging purposes
            Console.WriteLine($"Error en el método Create: {ex.Message}");

            // Return a 500 Internal Server Error response
            return StatusCode(500, "Se produjo un error interno al crear el paciente.");
        }
    }

    [HttpPut("paciente")]
    public IActionResult Update(int id, Paciente paciente)
    {
        if (id != paciente.Id)
        {
            return BadRequest("El ID proporcionado no coincide con el ID del Rol seleccionado.");
        }
        var pacienteToUpdate = _service.GetById(id);

        if (pacienteToUpdate == null)
        {
            return NotFound($"Usuario con ID {id} no encontrado.");
        }

        _service.Update(paciente);

        return NoContent();
    }
}
