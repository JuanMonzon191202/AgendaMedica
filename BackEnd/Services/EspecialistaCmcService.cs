using BackEdn.Data;
using BackEdn.Data.backendModels;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

public class EspecialistaCmcService
{
    private readonly CitasContext _context;

    public EspecialistaCmcService(CitasContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<EspecialistaCmc>> GetAllAsync()
    {
        var especialistasCmcConUsuarios = await _context.EspecialistasCmc
            .Include(p => p.Usuario)
            .ToListAsync();

        return especialistasCmcConUsuarios;
    }

    public async Task<EspecialistaCmc?> GetByIdAsync(int id)
    {
        var especialistaCmcConUsuario = await _context.EspecialistasCmc
            .Include(e => e.Usuario)
            .FirstOrDefaultAsync(e => e.Id == id);

        return especialistaCmcConUsuario;
    }

    public async Task<EspecialistaCmc> CreateAsync(EspecialistaCmc newEspecialistaCmc)
    {
        _context.EspecialistasCmc.Add(newEspecialistaCmc);
        await _context.SaveChangesAsync();

        return newEspecialistaCmc;
    }

    public async Task UpdateAsync(EspecialistaCmc especialistaCmc)
    {
        var existingEspecialistaCmc = await GetByIdAsync(especialistaCmc.Id);

        if (existingEspecialistaCmc != null)
        {
            if (especialistaCmc.Direccion != null)
            {
                existingEspecialistaCmc.Direccion = especialistaCmc.Direccion;
            }
            if (especialistaCmc.Ciudad != null)
            {
                existingEspecialistaCmc.Ciudad = especialistaCmc.Ciudad;
            }
            if (especialistaCmc.NoCedula != null)
            {
                existingEspecialistaCmc.NoCedula = especialistaCmc.NoCedula;
            }
            if (especialistaCmc.Descripcion != null)
            {
                existingEspecialistaCmc.Descripcion = especialistaCmc.Descripcion;
            }

            await _context.SaveChangesAsync();
        }
    }
}
