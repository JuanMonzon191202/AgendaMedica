using Microsoft.AspNetCore.Mvc;

using BackEdn.Services;
using BackEdn.Data.backendModels;


namespace BackEdn.Controllers;

[ApiController]
[Route("api[controller]")]
public class EspecialidadController : ControllerBase
{
    public readonly EspecialidadService _service;

    public EspecialidadController(EspecialidadService service)
    {
        _service = service;
    }

    [HttpGet("especialidad")]
    public IEnumerable<Especialidad> GetAll()
    {
        return _service.GetAll();
    }

    [HttpGet("especialidad/{id}")]
    public ActionResult<Especialidad> GetById(int id)
    {
        var EspecialidadFind = _service.GetById(id);

        if (EspecialidadFind is null)
        {
            return NotFound("Especialidad no encontrado...");
        }

        return EspecialidadFind;
    }

    [HttpPost("especialidad")]
    public IActionResult Create(Especialidad especialidad)
    {
        var newEspecialidad = _service.Create(especialidad);
        return CreatedAtAction(nameof(GetById), new { id = especialidad.Id }, newEspecialidad);
    }

    [HttpPut("especialidad/{id}")]
    public IActionResult Update(int id, Especialidad especialidad)
    {
        if (id != especialidad.Id)
        {
            return BadRequest(
                "El ID proporcionado no coincide con el ID de la Especialidad seleccionado."
            );
        }

        var especialidadToUpdate = _service.GetById(id);

        if (especialidadToUpdate != null)
        {
            return NotFound($"Especialidad con ID {id} no encontrado.");
        }

        _service.Update(especialidad);

        return NoContent();
    }
}
