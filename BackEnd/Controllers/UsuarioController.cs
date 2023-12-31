using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using BackEdn.Data.backendModels;
using BackEdn.Services;
using Microsoft.AspNetCore.Authorization;

namespace BackEdn.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly UsuarioService _service;

        public UsuarioController(UsuarioService service)
        {
            _service = service;
        }

        [Authorize(Roles = "Administrador")]
        [HttpGet("usuarios")]
        public async Task<IEnumerable<Usuario>> Get()
        {
            return await _service.GetAllAsync();
        }

        [Authorize]
        [HttpGet("usuario/{id}")]
        public async Task<ActionResult<Usuario>> GetById(int id)
        {
            var UsuarioFind = await _service.GetByIdAsync(id);

            // respuesta si encontro o no el usuario con el id
            if (UsuarioFind is null)
            {
                return NotFound("El Usuario especificado no existe.");
            }

            return UsuarioFind;
        }

        [HttpPost("usuario")]
        public async Task<IActionResult> Create(Usuario usuario)
        {
            /* Establece IsActive en false para el rol de EspecialistaCmc
            TODO cambiar con un GetById para cuando el rol deje de ser el 2 :)
            */
            if (usuario.IdRol == 2)
            {
                usuario.IsActive = false;
            }

            var newUsuario = await _service.CreateAsync(usuario);
            return CreatedAtAction(
                nameof(GetById),
                new { id = newUsuario.Id },
                new { Usuario = newUsuario, Message = "Perfil Creado" }
            );
        }

        [Authorize]
        [HttpPut("usuario/{id}")]
        public async Task<IActionResult> Update(int id, Usuario usuario)
        {
            if (id != usuario.Id)
            {
                return BadRequest(
                    "El ID proporcionado no coincide con el ID del Usuario seleccionado."
                );
            }

            try
            {
                // Validaciones adicionales
                if (
                    string.IsNullOrEmpty(usuario.Nombre)
                    && string.IsNullOrEmpty(usuario.Apellido)
                    && string.IsNullOrEmpty(usuario.Email)
                )
                {
                    return BadRequest(
                        "Se requiere al menos uno de los campos (Nombre, Apellido, Email) para actualizar."
                    );
                }

                await _service.UpdateAsync(usuario);
                return Ok(new { Message = "Datos Actualizados", UpdatedUser = usuario });
            }
            catch (Exception ex)
            {
                // Log the exception for debugging purposes
                Console.WriteLine($"Error en el método Update: {ex.Message}");

                // Return a 500 Internal Server Error response
                return StatusCode(500, "Se produjo un error interno al actualizar el usuario.");
            }
        }

        [Authorize]
        [HttpGet("usuarioPaciente")]
        public async Task<IEnumerable<Usuario>> ObtenerPacientes()
        {
            return await _service.GetPacientesAsync();
        }

        [Authorize]
        [HttpGet("usuarioEspecialista")]
        public async Task<IEnumerable<Usuario>> ObtenerEspecialistas()
        {
            return await _service.GetEspecialistasAsync();
        }

        [Authorize]
        [HttpGet("Especialistas-non")]
        public async Task<IEnumerable<Usuario>> ObtenerEspecialistasNoActivos()
        {
            return await _service.GetEspecialistasNoActivosAsync();
        }
    }
}
