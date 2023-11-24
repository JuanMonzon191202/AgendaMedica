using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackEnd.Migrations
{
    /// <inheritdoc />
    public partial class Citas : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Citas_EspecialistasCmc_IdUsuarioEspecialistaCmc",
                table: "Citas");

            migrationBuilder.DropForeignKey(
                name: "FK_Citas_Pacientes_IdUsuarioPaciente",
                table: "Citas");

            migrationBuilder.AddColumn<int>(
                name: "PacienteId",
                table: "Citas",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Citas_PacienteId",
                table: "Citas",
                column: "PacienteId");

            migrationBuilder.AddForeignKey(
                name: "FK_Citas_Pacientes_PacienteId",
                table: "Citas",
                column: "PacienteId",
                principalTable: "Pacientes",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Citas_Usuarios_IdUsuarioEspecialistaCmc",
                table: "Citas",
                column: "IdUsuarioEspecialistaCmc",
                principalTable: "Usuarios",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Citas_Usuarios_IdUsuarioPaciente",
                table: "Citas",
                column: "IdUsuarioPaciente",
                principalTable: "Usuarios",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Citas_Pacientes_PacienteId",
                table: "Citas");

            migrationBuilder.DropForeignKey(
                name: "FK_Citas_Usuarios_IdUsuarioEspecialistaCmc",
                table: "Citas");

            migrationBuilder.DropForeignKey(
                name: "FK_Citas_Usuarios_IdUsuarioPaciente",
                table: "Citas");

            migrationBuilder.DropIndex(
                name: "IX_Citas_PacienteId",
                table: "Citas");

            migrationBuilder.DropColumn(
                name: "PacienteId",
                table: "Citas");

            migrationBuilder.AddForeignKey(
                name: "FK_Citas_EspecialistasCmc_IdUsuarioEspecialistaCmc",
                table: "Citas",
                column: "IdUsuarioEspecialistaCmc",
                principalTable: "EspecialistasCmc",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Citas_Pacientes_IdUsuarioPaciente",
                table: "Citas",
                column: "IdUsuarioPaciente",
                principalTable: "Pacientes",
                principalColumn: "Id");
        }
    }
}
