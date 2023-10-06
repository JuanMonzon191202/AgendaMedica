namespace BackEdn.Services;

using BackEdn.Data;
using BackEdn.Data.backendModels;
using Microsoft.EntityFrameworkCore;

public class EspecialistaCmcService
{
    private readonly CitasContext _context;

    public EspecialistaCmcService(CitasContext context)
    {
        _context = context;
    }

    public IEnumerable<EspecialistaCmc> GetAll()
    {
        var EspecialistasCmcConUsuarios = _context.EspecialistasCmc
            .Include(p => p.Usuario)
            .ToList();

        return EspecialistasCmcConUsuarios;
    }

    public EspecialistaCmc? GetById(int id)
    {
        var especialistaCmcConUsuario = _context.EspecialistasCmc
            .Include(e => e.Usuario)
            .FirstOrDefault(e => e.Id == id);

        return especialistaCmcConUsuario;
    }

    public EspecialistaCmc Create (EspecialistaCmc newEspecialistaCmc)
    {
        _context.EspecialistasCmc.Add(newEspecialistaCmc);
        _context.SaveChanges();
        
        return newEspecialistaCmc;
    }

    public void Update(EspecialistaCmc especialistaCmc)
    {
        var existingEspecialistaCmc = GetById(especialistaCmc.Id);

        if (existingEspecialistaCmc != null)
        {
            if (especialistaCmc.Descripcion != null)
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
        }
    }
}
