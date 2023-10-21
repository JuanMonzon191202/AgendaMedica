using Microsoft.AspNetCore.Mvc;
using BackEdn.Services;
using BackEdn.Data.backendModels;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace BackEdn.Controllers
{
    [Authorize] // Añade autenticación a todo el controlador
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
        public async Task<IEnumerable<EspecialistaCmc>> Get()
        {
            return await _service.GetAllAsync();
        }

        [HttpGet("especialistas/{id}")]
        public async Task<ActionResult<EspecialistaCmc>> GetById(int id)
        {
            var especialistaFind = await _service.GetByIdAsync(id);

            if (especialistaFind == null)
            {
                return NotFound("Especialista no encontrado...");
            }
            return especialistaFind;
        }

        [HttpGet("especialistas-por-especialidad/{id}")]
        public async Task<ActionResult<IEnumerable<EspecialistaCmc>>> GetByEspecialidadAsync(int id)
        {
            var especialistas = await _service.GetByEspecialidadAsync(id);

            if (especialistas == null || !especialistas.Any())
            {
                return NotFound(
                    $"No se encontraron especialistas para la especialidad con ID {id}"
                );
            }

            return Ok(especialistas);
        }

        [HttpPost("especialistas")]
        public async Task<IActionResult> Create(EspecialistaCmc especialistaCmc)
        {
            try
            {
                if (especialistaCmc == null)
                {
                    return BadRequest("El objeto especialistaCmc es nulo.");
                }

                var newespecialistaCmc = await _service.CreateAsync(especialistaCmc);

                if (newespecialistaCmc == null)
                {
                    return BadRequest("Error al crear el especialistaCmc.");
                }

                return CreatedAtAction(
                    nameof(GetById),
                    new { id = newespecialistaCmc.Id },
                    new { EspecialistaCmc = newespecialistaCmc, Message = "Datos completados" }
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

        [Authorize(Roles = "Administrador,Especialista")]
        [HttpPut("especialistas/{id}")]
        public async Task<IActionResult> Update(int id, EspecialistaCmc especialistaCmc)
        {
            if (id != especialistaCmc.Id)
            {
                return BadRequest(
                    "El ID proporcionado no coincide con el ID del Especialista seleccionado."
                );
            }

            var especialistaCmcToUpdate = await _service.GetByIdAsync(id);

            if (especialistaCmcToUpdate == null)
            {
                return NotFound($"Usuario con ID {id} no encontrado.");
            }

            await _service.UpdateAsync(especialistaCmc);

            return Ok(new { Message = "Datos Actualizados" });
        }
    }
}
