using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BackEdn.Data;
using BackEdn.Data.backendModels;

public class UsuarioService
{
    private readonly CitasContext _context;

    public UsuarioService(CitasContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Usuario>> GetAllAsync()
    {
        return await _context.Usuarios.ToListAsync();
    }

    public async Task<Usuario> CreateAsync(Usuario newUsuario)
    {
        // Encripta la contraseña antes de almacenarla en la base de datos
        newUsuario.Password = HashPassword(newUsuario.Password);

        _context.Usuarios.Add(newUsuario);
        await _context.SaveChangesAsync();

        return newUsuario;
    }

    public async Task<Usuario?> GetByIdAsync(int id)
    {
        return await _context.Usuarios
            .Include(u => u.Rol)
            .Include(u => u.Pacientes)
            .Include(u => u.EspecialistasCmc)
            .FirstOrDefaultAsync(u => u.Id == id);
    }

    //obtener nombre del role
    public async Task<Usuario> GetByIdRolAsync(int id)
    {
        return await _context.Usuarios.Include(u => u.Rol).FirstOrDefaultAsync(u => u.Id == id);
    }

    public async Task UpdateAsync(Usuario usuario)
    {
        var existingUser = await _context.Usuarios.FindAsync(usuario.Id);

        if (existingUser != null)
        {
            // Actualiza solo si se proporciona un valor no nulo o vacío
            if (!string.IsNullOrEmpty(usuario.Nombre))
            {
                existingUser.Nombre = usuario.Nombre;
            }

            if (!string.IsNullOrEmpty(usuario.Apellido))
            {
                existingUser.Apellido = usuario.Apellido;
            }

            if (!string.IsNullOrEmpty(usuario.Email))
            {
                existingUser.Email = usuario.Email;
            }

            // Actualiza la contraseña solo si se proporciona
            if (!string.IsNullOrEmpty(usuario.Password))
            {
                // Encripta la nueva contraseña antes de almacenarla
                existingUser.Password = HashPassword(usuario.Password);
            }

            existingUser.IsActive = usuario.IsActive;

            await _context.SaveChangesAsync();
        }
    }

    public async Task<Usuario> AuthenticateAsync(string email, string password)
    {
        string hashedPassword = HashPassword(password);

        return await _context.Usuarios.SingleOrDefaultAsync(
            u => u.Email == email && u.Password == hashedPassword
        );
    }

    // Método para encriptar la contraseña usando SHA-256
    private string HashPassword(string password)
    {
        using (SHA256 sha256 = SHA256.Create())
        {
            byte[] hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
        }
    }

    public class UserInfo
    {
        public string UserId { get; set; }
        public string UserRole { get; set; }
    }

    public async Task<UserInfo> GetUserInfoAsync(string userId)
    {
        var usuario = await GetByIdAsync(int.Parse(userId));

        if (usuario == null)
        {
            throw new DllNotFoundException($"Usuario con ID {userId} no encontrado.");
        }

        var userInfo = new UserInfo
        {
            UserId = userId,
            UserRole = usuario.Rol?.NombreRol ?? "Usuario sin rol"
        };

        return userInfo;
    }

    public async Task<IEnumerable<Usuario>> GetPacientesAsync()
    {
        return await _context.Usuarios.Where(u => u.IdRol == 3).ToListAsync();
    }

    public async Task<IEnumerable<Usuario>> GetEspecialistasAsync()
    {
        return await _context.Usuarios.Where(u => u.IdRol == 2).ToListAsync();
    }

    public async Task<IEnumerable<Usuario>> GetEspecialistasNoActivosAsync()
    {
        return await _context.Usuarios
            .Where(u => u.IdRol == 2 && !u.IsActive) // Supongamos que el ID del rol para especialistas es 2
            .ToListAsync();
    }
}
