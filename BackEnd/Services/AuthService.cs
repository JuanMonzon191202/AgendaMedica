using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BackEdn.Services
{
    public class AuthService
    {
        private readonly string _secretKey;
        private readonly UsuarioService _usuarioService;

        public AuthService(string secretKey, UsuarioService usuarioService)
        {
            _secretKey = secretKey;
            _usuarioService = usuarioService;
        }

        public async Task<string> GenerateTokenAsync(string userId, string userEmail)
        {
            var userInfo = await _usuarioService.GetUserInfoAsync(userId);

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_secretKey);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(
                    new Claim[]
                    {
                        new Claim(ClaimTypes.NameIdentifier, userInfo.UserId),
                        new Claim(ClaimTypes.Email, userEmail),
                        new Claim(ClaimTypes.Role, userInfo.UserRole)
                    }
                ),
                Expires = DateTime.UtcNow.AddMinutes(2),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature
                )
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public async Task<string> RefreshTokenAsync(string refreshToken)
        {
            //Console.WriteLine($"Token de actualización recibido: {refreshToken}");

            if (string.IsNullOrEmpty(refreshToken))
            {
                // Manejo de error: el token de actualización es nulo o vacío
                //Console.WriteLine("Error: el token de actualización es nulo o vacío");
                return null;
            }
            var decodedToken = DecodeJwtToken(refreshToken);

            //Console.WriteLine($"Token decodificado: {decodedToken}");

            try
            {
                var (userId, userEmail) = ExtractUserIdAndEmailFromToken(refreshToken);

                if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(userEmail))
                {
                    // Manejo de error: no se pudieron extraer el ID de usuario o el correo electrónico del token
                    Console.WriteLine(
                        "Error: no se pudieron extraer el ID del usuario o el correo electrónico del token"
                    );
                    return null;
                }

                return await GenerateTokenAsync(userId, userEmail);
            }
            catch (Exception ex)
            {
                // Manejo de error: ocurrió una excepción al procesar el token de actualización
                Console.WriteLine($"Error al procesar el token de actualización: {ex.Message}");
                return null;
            }
        }

        private string DecodeJwtToken(string token)
        {
            var handler = new JwtSecurityTokenHandler();

            try
            {
                var jsonToken = handler.ReadToken(token) as JwtSecurityToken;

                // Verificar si jsonToken es nulo antes de intentar acceder a sus propiedades
                if (jsonToken == null)
                {
                    //Console.WriteLine("Error: el token de actualización no es válido");
                    return null;
                }

                return jsonToken.ToString();
            }
            catch (Exception ex)
            {
                // Manejo de error: ocurrió una excepción al decodificar el token
                Console.WriteLine($"Error al decodificar el token: {ex.Message}");
                return null;
            }
        }

        private (string UserId, string UserEmail) ExtractUserIdAndEmailFromToken(string token)
        {
            var userId = "";
            var userEmail = "";
            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(token) as JwtSecurityToken;

            // Verificar si jsonToken es nulo antes de intentar acceder a sus propiedades
            if (jsonToken == null)
            {
                //Console.WriteLine("Error: el token de actualización no es válido");
                return (null, null);
            }

            // Mostrar todas las reclamaciones del token
            //Console.WriteLine("Reclamaciones del token:");
            foreach (var claim in jsonToken.Claims)
            {
                if (claim.Type == "nameid")
                {
                    userId = claim.Value;
                }
                if (claim.Type == "email")
                {
                    userEmail = claim.Value;
                }
                //Console.WriteLine($"{claim.Type}: {claim.Value}");
            }

            // Verificar si se encontraron las reclamaciones correspondientes
            if (userId == null || userEmail == null)
            {
                //Console.WriteLine(
                //     "Error: no se pudieron encontrar las reclamaciones necesarias en el token"
                // );
                return (null, null);
            }

            return (userId, userEmail);
        }
    }
}
