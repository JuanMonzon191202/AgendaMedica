using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
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

    public IEnumerable<Usuario> GetAll()
    {
        return _context.Usuarios.ToList();
    }

    public Usuario Create(Usuario newUsuario)
    {
        // Encripta la contraseña antes de almacenarla en la base de datos
        newUsuario.Password = HashPassword(newUsuario.Password);

        _context.Usuarios.Add(newUsuario);
        _context.SaveChanges();

        return newUsuario;
    }

    public Usuario? GetById(int id)
    {
        return _context.Usuarios
            .Include(u => u.Rol) 
            .Include(u => u.Pacientes)
            .Include(u => u.EspecialistasCmc)
            .FirstOrDefault(u => u.Id == id);
    }

    public Usuario Authenticate(string email, string password)
    {
        // TODO Encriptar la contraseña proporcionada antes de compararla con la almacenada
        string hashedPassword = HashPassword(password);

        return _context.Usuarios.SingleOrDefault(
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
