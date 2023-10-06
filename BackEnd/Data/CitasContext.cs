using BackEdn.Data.backendModels;
using Microsoft.EntityFrameworkCore;

namespace BackEdn.Data
{
    public class CitasContext : DbContext
    {
        public DbSet<Rol> Roles { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<EspecialistaCmc> EspecialistasCmc { get; set; }
        public DbSet<Paciente> Pacientes { get; set; }
        public DbSet<Especialidad> Especialidades { get; set; }
        public DbSet<EspecialidadEspecialista> EspecialidadesEspecialistas { get; set; }
        public DbSet<Cita> Citas { get; set; }

        public CitasContext(DbContextOptions<CitasContext> options)
            : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<Usuario>()
                .HasOne(u => u.Rol)
                .WithMany()
                .HasForeignKey(u => u.IdRol);

            modelBuilder
                .Entity<Usuario>()
                .HasMany(u => u.Pacientes)
                .WithOne(p => p.Usuario)
                .HasForeignKey(p => p.IdUsuario);

            modelBuilder
                .Entity<Usuario>()
                .HasMany(u => u.EspecialistasCmc)
                .WithOne(ec => ec.Usuario)
                .HasForeignKey(ec => ec.IdUsuario);

            modelBuilder
                .Entity<EspecialistaCmc>()
                .HasMany(ec => ec.Citas)
                .WithOne(c => c.EspecialistaCmc)
                .HasForeignKey(c => c.IdUsuarioEspecialistaCmc);

            modelBuilder
                .Entity<EspecialidadEspecialista>()
                .HasKey(ee => new { ee.IdEspecialidad, ee.IdEspecialistaCmc });

            modelBuilder
                .Entity<EspecialidadEspecialista>()
                .HasOne(ee => ee.Especialidad)
                .WithMany(e => e.Especialistas)
                .HasForeignKey(ee => ee.IdEspecialidad);

            modelBuilder
                .Entity<EspecialistaCmc>()
                .HasMany(ec => ec.Especialidades)
                .WithOne(ee => ee.EspecialistaCmc)
                .HasForeignKey(ee => ee.IdEspecialistaCmc);

            modelBuilder
                .Entity<Cita>()
                .HasOne(c => c.Paciente)
                .WithMany(p => p.Citas)
                .HasForeignKey(c => c.IdUsuarioPaciente)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder
                .Entity<Cita>()
                .HasOne(c => c.EspecialistaCmc)
                .WithMany(ec => ec.Citas)
                .HasForeignKey(c => c.IdUsuarioEspecialistaCmc)
                .OnDelete(DeleteBehavior.NoAction);

            // Aquí puedes agregar otras configuraciones según sea necesario

            base.OnModelCreating(modelBuilder);
        }
    }
}
