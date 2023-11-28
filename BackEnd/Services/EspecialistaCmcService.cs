using BackEdn.Data;
using BackEdn.Data.backendModels;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

// ]
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

    public async Task<IEnumerable<EspecialistaCmc>> GetAllNoActiveAsync()
    {
        var especialistasCmcConUsuarios = await _context.EspecialistasCmc
            .Include(e => e.Usuario)
            .Where(e => e.Usuario.IsActive == false)
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

    public async Task<IEnumerable<EspecialistaCmc>> GetByEspecialidadAsync(int id)
    {
        var especialistasPorEspecialidad = await _context.EspecialistasCmc
            .Include(e => e.Usuario)
            .Where(e => e.Especialidades.Any(es => es.IdEspecialidad == id))
            .ToListAsync();

        return especialistasPorEspecialidad;
    }

    public async Task<IEnumerable<EspecialistaCmc>> GetByEspecialidadAndEstadoAsync(
        int idEspecialidad,
        string estado
    )
    {
        var especialistasPorEspecialidadYEstado = await _context.EspecialistasCmc
            .Include(e => e.Usuario)
            .Where(
                e =>
                    e.Especialidades.Any(es => es.IdEspecialidad == idEspecialidad)
                    && e.Ciudad == estado
            // && e.Usuario.IsActive == true
            )
            .ToListAsync();

        return especialistasPorEspecialidadYEstado;
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
        var exists = await _context.EspecialistasCmc.AnyAsync(e => e.Id == especialistaCmc.Id);
        if (!exists)
        {
            // La entidad no existe, manejar el caso según sea necesario
            return;
        }
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
