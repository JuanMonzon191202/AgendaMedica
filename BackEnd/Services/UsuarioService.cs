using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks; // Agregado para admitir operaciones asincrónicas
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

    // Añade este método a tu UsuarioService
    public async Task UpdateAsync(Usuario usuario)
    {
        var existingUser = await _context.Usuarios.FindAsync(usuario.Id);

        if (existingUser != null)
        {
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
            if (!string.IsNullOrEmpty(usuario.Password))
            {
                // Encripta la nueva contraseña antes de almacenarla
                existingUser.Password = HashPassword(usuario.Password);
            }
            if (usuario.IsActive)
            {
                existingUser.IsActive = usuario.IsActive;
            }

            await _context.SaveChangesAsync();
        }
    }

    public async Task<Usuario> AuthenticateAsync(string email, string password)
    {
        // TODO: Encriptar la contraseña proporcionada antes de compararla con la almacenada
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
}
