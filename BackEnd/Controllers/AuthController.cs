using BackEdn.Data.backendModels;
using BackEdn.Services;
using Microsoft.AspNetCore.Mvc;

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
        public IActionResult Login([FromBody] LoginRequest model)
        {
            var user = _usuarioService.Authenticate(model.Email, model.Password);

            if (user == null)
                return Unauthorized("Credenciales inválidas");

            var token = _authService.GenerateToken(user.Id.ToString(), user.Email);

            return Ok(new { Token = token });
        }
    }

    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
