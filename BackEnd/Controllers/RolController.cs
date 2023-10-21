using Microsoft.AspNetCore.Mvc;
using BackEdn.Services;
using BackEdn.Data.backendModels;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace BackEdn.Controllers
{
    // [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class RolController : ControllerBase
    {
        private readonly RolService _service;

        public RolController(RolService service)
        {
            _service = service;
        }

        [HttpGet("roles")]
        public async Task<IEnumerable<Rol>> Get()
        {
            return await _service.GetAllAsync();
        }

        [HttpGet("roles/{id}")]
        public async Task<ActionResult<Rol>> GetById(int id)
        {
            var rolFind = await _service.GetByIdAsync(id);

            if (rolFind == null)
            {
                return NotFound("Rol no encontrado...");
            }

            return rolFind;
        }

        [Authorize(Roles = "Administrador")]
        [HttpPost("roles")]
        public async Task<IActionResult> Create(Rol rol)
        {
            var newRol = await _service.CreateAsync(rol);
            return CreatedAtAction(
                nameof(GetById),
                new { id = newRol.Id },
                new { Rol = newRol, Message = "Rol Creado" }
            );
        }

        [Authorize(Roles = "Administrador")]
        [HttpPut("roles/{id}")]
        public async Task<IActionResult> Update(int id, Rol rol)
        {
            if (id != rol.Id)
            {
                return BadRequest(
                    "El ID proporcionado no coincide con el ID del Rol seleccionado."
                );
            }

            var rolToUpdate = await _service.GetByIdAsync(id);

            if (rolToUpdate == null)
            {
                return NotFound($"Rol con ID {id} no encontrado.");
            }

            await _service.UpdateAsync(rol);

            return StatusCode(204, new { Message = "Datos Actualizados" });
        }
    }
}
