namespace BackEdn.Services;

using BackEdn.Data;
using BackEdn.Data.backendModels;

public class EspecialidadEspecialistaService
{
    private readonly CitasContext _context;

    public EspecialidadEspecialistaService(CitasContext context)
    {
        _context = context;
    }

    public IEnumerable<EspecialidadEspecialista> GetAll()
    {
        return _context.EspecialidadesEspecialistas.ToList();
    }

    public EspecialidadEspecialista GetById(int id)
    {
        return _context.EspecialidadesEspecialistas.SingleOrDefault(e => e.IdEspecialistaCmc == id);
    }

    public EspecialidadEspecialista Create(EspecialidadEspecialista newEspecialidadEspecialista)
    {
        _context.EspecialidadesEspecialistas.Add(newEspecialidadEspecialista);
        _context.SaveChanges();

        return newEspecialidadEspecialista;
    }

    public void Update(EspecialidadEspecialista especialidadEspecialista)
    {
        var existingEsp = GetById(especialidadEspecialista.Id);

        if (existingEsp == null)
        {
            throw new ArgumentException(
                $"EspecialidadEspecialista con ID {especialidadEspecialista.Id} no encontrado."
            );
        }

        if (especialidadEspecialista.IdEspecialidad != null)
        {
            existingEsp.IdEspecialidad = especialidadEspecialista.IdEspecialidad;
        }

        _context.SaveChanges();
    }
}
