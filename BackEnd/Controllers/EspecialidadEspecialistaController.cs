using Microsoft.AspNetCore.Mvc;

using BackEdn.Data;
using BackEdn.Data.backendModels;
using BackEdn.Services;
using System.IO.Pipelines;

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
        public IEnumerable<EspecialidadEspecialista> Get()
        {
            return _service.GetAll();
        }

        [HttpGet("especialidadEspecialista/{id}")]
        public ActionResult<EspecialidadEspecialista> GetById(int id)
        {
            var EspFind = _service.GetById(id);

            if (EspFind is null)
            {
                return NotFound("Especialidades no encontradas...");
            }
            return EspFind;
        }

        [HttpPost("especialidadEspecialista")]
        public IActionResult Create(EspecialidadEspecialista especialidadEspecialista)
        {
            var newEspecialidadEspecialista = _service.Create(especialidadEspecialista);
            return CreatedAtAction(
                nameof(GetById),
                new { id = newEspecialidadEspecialista.Id },
                newEspecialidadEspecialista
            );
        }

        [HttpPut("EspecialidadEspecialista/{id}")]
        public IActionResult Update(int id, EspecialidadEspecialista especialidadEspecialista)
        {
            if (id != especialidadEspecialista.Id)
            {
                return BadRequest("El ID proporcionado no coincide con el ID seleccionado.");
            }

            var EspToUpdate = _service.GetById(id);

            if (EspToUpdate == null)
            {
                return NotFound($"Especialidades con ID {id} no encontrado.");
            }
            _service.Update(especialidadEspecialista);
            return NoContent();
        }
    }
}
