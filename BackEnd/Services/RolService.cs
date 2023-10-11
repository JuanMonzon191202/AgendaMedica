using BackEdn.Data;
using BackEdn.Data.backendModels;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

public class RolService
{
    private readonly CitasContext _context;

    public RolService(CitasContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Rol>> GetAllAsync()
    {
        return await _context.Roles.ToListAsync();
    }

    public async Task<Rol?> GetByIdAsync(int id)
    {
        return await _context.Roles.FindAsync(id);
    }

    public async Task<Rol> CreateAsync(Rol newRol)
    {
        _context.Roles.Add(newRol);
        await _context.SaveChangesAsync();

        return newRol;
    }

    public async Task UpdateAsync(Rol rol)
    {
        var existingRol = await GetByIdAsync(rol.Id);

        if (existingRol != null)
        {
            if (rol.NombreRol != null)
            {
                existingRol.NombreRol = rol.NombreRol;
            }
            await _context.SaveChangesAsync();
        }
    }
}
