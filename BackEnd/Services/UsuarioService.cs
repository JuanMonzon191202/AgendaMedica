namespace BackEdn.Services;

using BackEdn.Data;
using BackEdn.Data.backendModels;
using Microsoft.EntityFrameworkCore;

public class UsuarioService{

    private readonly CitasContext _context;

    public UsuarioService(CitasContext context){
        _context = context;
    }


    public IEnumerable<Usuario> GetAll()
    {
        return _context.Usuarios.ToList();
    }

    public Usuario Create(Usuario newUsuario)
    {
        _context.Usuarios.Add(newUsuario);
        _context.SaveChanges();

        return newUsuario;
    }
    public Usuario? GetById(int id)
    {
         return _context.Usuarios
                    .Include(u => u.Rol)  // Asegúrate de incluir las propiedades de navegación que necesitas
                    .Include(u => u.Pacientes)
                    .Include(u => u.EspecialistasCmc)
                    .FirstOrDefault(u => u.Id == id);
    }


}
