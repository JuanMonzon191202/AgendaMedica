using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace BackEdn.Data.backendModels
{
    public class EspecialidadEspecialista
    {   
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public int IdEspecialidad { get; set; }
        public int IdEspecialistaCmc { get; set; }

        public Especialidad? Especialidad { get; set; }
        public EspecialistaCmc? EspecialistaCmc { get; set; }
    }
}
