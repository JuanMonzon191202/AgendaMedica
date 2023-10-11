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
    public class PacienteController : ControllerBase
    {
        private readonly PacienteService _service;

        public PacienteController(PacienteService service)
        {
            _service = service;
        }

        [HttpGet("pacientes")]
        public async Task<IEnumerable<Paciente>> Get()
        {
            return await _service.GetAllAsync();
        }

        [HttpGet("paciente/{id}")]
        public async Task<ActionResult<Paciente>> GetById(int id)
        {
            var pacienteFind = await _service.GetByIdAsync(id);
            if (pacienteFind == null)
            {
                return NotFound("Paciente no encontrado...");
            }
            return pacienteFind;
        }

        [HttpPost("paciente")]
        public async Task<IActionResult> Create(Paciente paciente)
        {
            try
            {
                if (paciente == null)
                {
                    return BadRequest("El objeto paciente es nulo.");
                }

                var newPaciente = await _service.CreateAsync(paciente);

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

        [HttpPut("paciente/{id}")]
        public async Task<IActionResult> Update(int id, Paciente paciente)
        {
            if (id != paciente.Id)
            {
                return BadRequest(
                    "El ID proporcionado no coincide con el ID del Paciente seleccionado."
                );
            }
            var pacienteToUpdate = await _service.GetByIdAsync(id);

            if (pacienteToUpdate == null)
            {
                return NotFound($"Paciente con ID {id} no encontrado.");
            }

            await _service.UpdateAsync(paciente);

            return NoContent();
        }
    }
}
