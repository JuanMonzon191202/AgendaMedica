namespace BackEdn.Services;

using BackEdn.Data;
using BackEdn.Data.backendModels;

public class RolService
{
    private readonly CitasContext _context;

    public RolService(CitasContext context)
    {
        _context = context;
    }

    public IEnumerable<Rol> GetAll()
    {
        return _context.Roles.ToList();
    }

    public Rol? GetById(int id)
    {
        return _context.Roles.Find(id);
    }

    public Rol Create(Rol newRol)
    {
        _context.Roles.Add(newRol);
        _context.SaveChanges();

        return newRol;
    }

    public void Update(Rol rol)
    {
        var existingRol = GetById(rol.Id);

        if (existingRol != null)
        {
            if (rol.NombreRol != null)
            {
                existingRol.NombreRol = rol.NombreRol;
            }
            _context.SaveChanges();
        }
    }
}
