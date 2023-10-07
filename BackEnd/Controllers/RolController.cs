using Microsoft.AspNetCore.Mvc;
using BackEdn.Services;
using BackEdn.Data.backendModels;

namespace BackEdn.Controllers;

[ApiController]
[Route("api[controller]")]
public class RolController : ControllerBase
{
    private readonly RolService _service;

    public RolController(RolService service)
    {
        _service = service;
    }

    [HttpGet("roles")]
    public IEnumerable<Rol> Get()
    {
        return _service.GetAll();
    }

    [HttpGet("roles/{id}")]
    public ActionResult<Rol> GetById(int id)
    {
        var rolFind = _service.GetById(id);

        if (rolFind is null)
        {
            return NotFound("Rol no encontrado...");
        }
        return rolFind;
    }

    [HttpPost("roles")]
    public IActionResult Create(Rol rol)
    {
        var newRol = _service.Create(rol);
        return CreatedAtAction(nameof(GetById), new { id = newRol.Id }, newRol);
    }

    [HttpPut("roles/{id}")]
    public IActionResult Update(int id, Rol rol)
    {
        if (id != rol.Id)
        {
            return BadRequest("El ID proporcionado no coincide con el ID del Rol seleccionado.");
        }
        var rolToUpdate = _service.GetById(id);

        if (rolToUpdate == null)
        {
            return NotFound($"Rol con ID {id} no encontrado.");
        }

        _service.Update(rol);

        return NoContent();
    }
}
