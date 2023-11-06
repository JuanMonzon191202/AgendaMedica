using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace BackEdn.Data.backendModels
{
    public class EspecialidadEspecialista
    {
        public int Id { get; set; }
        public int IdEspecialidad { get; set; }
        public int IdEspecialistaCmc { get; set; }

        [ForeignKey("IdEspecialidad")] 
        public Especialidad? Especialidad { get; set; }

        [ForeignKey("IdEspecialistaCmc")] 
        public EspecialistaCmc? EspecialistaCmc { get; set; }
    }
}
