namespace BackEdn.Services;

using BackEdn.Data;
using BackEdn.Data.backendModels;

public class CitasService
{
    private readonly CitasContext _context;

    public CitasService(CitasContext context)
    {
        _context = context;
    }

    public IEnumerable<Cita> GetAll()
    {
        return _context.Citas.ToList();
    }

    public Cita? GetById(int id)
    {
        return _context.Citas.Find(id);
    }

    // Get All Citas para pacientes
    public IEnumerable<Cita> GetAllByUserId(int userId)
    {
        return _context.Citas.Where(c => c.IdUsuarioPaciente == userId).ToList();
    }

    // Get All Citas para EspecialistaCmc
    public IEnumerable<Cita> GetAllByEspecialistaId(int especialistaId)
    {
        return _context.Citas.Where(c => c.IdUsuarioEspecialistaCmc == especialistaId).ToList();
    }

    public Cita Create(Cita newCita)
    {
        _context.Citas.Add(newCita);
        _context.SaveChanges();

        return newCita;
    }

    public void Update(Cita cita)
    {
        var existingcita = GetById(cita.Id);

        if (existingcita != null)
        {
            if (cita.IdUsuarioPaciente != 0)
            {
                existingcita.IdUsuarioPaciente = cita.IdUsuarioPaciente;
            }
            if (cita.IdUsuarioEspecialistaCmc != 0)
            {
                existingcita.IdUsuarioEspecialistaCmc = cita.IdUsuarioEspecialistaCmc;
            }
        }
        _context.SaveChanges();
    }
}
