using Microsoft.AspNetCore.Mvc;
using BackEdn.Services;
using BackEdn.Data.backendModels;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace BackEdn.Controllers
{
    [Authorize(Roles = "Administrador,Paciente,Especialista")]
    [ApiController]
    [Route("api/[controller]")]
    public class EspecialidadController : ControllerBase
    {
        private readonly EspecialidadService _service;

        public EspecialidadController(EspecialidadService service)
        {
            _service = service;
        }

        [HttpGet("especialidades")]
        public async Task<IEnumerable<Especialidad>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        [HttpGet("especialidades/{id}")]
        public async Task<ActionResult<Especialidad>> GetById(int id)
        {
            var especialidadFind = await _service.GetByIdAsync(id);

            if (especialidadFind == null)
            {
                return NotFound("Especialidad no encontrada...");
            }

            return especialidadFind;
        }

        [HttpPost("especialidades")]
        public async Task<IActionResult> Create(Especialidad especialidad)
        {
            var newEspecialidad = await _service.CreateAsync(especialidad);
            return CreatedAtAction(
                nameof(GetById),
                new { id = newEspecialidad.Id },
                newEspecialidad
            );
        }

        [HttpPut("especialidades/{id}")]
        public async Task<IActionResult> Update(int id, Especialidad especialidad)
        {
            if (id != especialidad.Id)
            {
                return BadRequest(
                    "El ID proporcionado no coincide con el ID de la Especialidad seleccionada."
                );
            }

            var especialidadToUpdate = await _service.GetByIdAsync(id);

            if (especialidadToUpdate == null)
            {
                return NotFound($"Especialidad con ID {id} no encontrada.");
            }

            await _service.UpdateAsync(especialidad);

            return NoContent();
        }
    }
}
