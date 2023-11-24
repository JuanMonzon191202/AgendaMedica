using BackEdn.Data.backendModels;
using BackEdn.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace BackEdn.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;
        private readonly UsuarioService _usuarioService;

        public AuthController(AuthService authService, UsuarioService usuarioService)
        {
            _authService = authService;
            _usuarioService = usuarioService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest model)
        {
            var user = await Task.Run(
                () => _usuarioService.AuthenticateAsync(model.Email, model.Password)
            );

            if (user == null)
                return Unauthorized("Credenciales inválidas");

            var token = _authService.GenerateTokenAsync(user.Id.ToString(), user.Email);

            return Ok(new { Token = token, Message = "Login Completo" });
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
        {
            try
            {
                var newAccessToken = await _authService.RefreshTokenAsync(request.RefreshToken);
                return Ok(new { AccessToken = newAccessToken });
            }
            catch (Exception ex)
            {
                // Log the exception for debugging purposes
                Console.WriteLine($"Error al intentar renovar el token: {ex.Message}");
                return BadRequest("Error al intentar renovar el token.");
            }
        }

        public class LoginRequest
        {
            public required string Email { get; set; }
            public required string Password { get; set; }
        }

        public class RefreshTokenRequest
        {
            public required string RefreshToken { get; set; }
        }
    }
}
