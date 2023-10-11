using Microsoft.AspNetCore.Mvc;
using BackEdn.Data.backendModels;
using BackEdn.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BackEdn.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EspecialidadEspecialistaController : ControllerBase
    {
        private readonly EspecialidadEspecialistaService _service;

        public EspecialidadEspecialistaController(EspecialidadEspecialistaService service)
        {
            _service = service;
        }

        [HttpGet("especialidad")]
        public async Task<IEnumerable<EspecialidadEspecialista>> Get()
        {
            return await _service.GetAllAsync();
        }

        [HttpGet("especialidadEspecialista/{id}")]
        public async Task<ActionResult<EspecialidadEspecialista>> GetById(int id)
        {
            var EspFind = await _service.GetByIdAsync(id);

            if (EspFind is null)
            {
                return NotFound("Especialidades no encontradas...");
            }
            return EspFind;
        }

        [HttpPost("especialidadEspecialista")]
        public async Task<IActionResult> Create(EspecialidadEspecialista especialidadEspecialista)
        {
            var newEspecialidadEspecialista = await _service.CreateAsync(especialidadEspecialista);
            return CreatedAtAction(
                nameof(GetById),
                new { id = newEspecialidadEspecialista.Id },
                newEspecialidadEspecialista
            );
        }

        [HttpPut("EspecialidadEspecialista/{id}")]
        public async Task<IActionResult> Update(int id, EspecialidadEspecialista especialidadEspecialista)
        {
            if (id != especialidadEspecialista.Id)
            {
                return BadRequest("El ID proporcionado no coincide con el ID seleccionado.");
            }

            var EspToUpdate = await _service.GetByIdAsync(id);

            if (EspToUpdate == null)
            {
                return NotFound($"Especialidades con ID {id} no encontrado.");
            }
            await _service.UpdateAsync(especialidadEspecialista);
            return NoContent();
        }
    }
}
