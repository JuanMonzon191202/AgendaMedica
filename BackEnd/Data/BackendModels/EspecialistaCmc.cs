using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace BackEdn.Data.backendModels
{
    public class EspecialistaCmc
    {
        public int Id { get; set; }
        public int IdUsuario { get; set; }
        public string Direccion { get; set; }
        public string Ciudad { get; set; }
        public string Pais { get; set; }
        public string NoCedula { get; set; }
        public string Descripcion { get; set; }

        public Usuario? Usuario { get; set; }

        public ICollection<EspecialidadEspecialista>? Especialidades { get; set; }
    }
}
