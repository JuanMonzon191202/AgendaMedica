export const ApiEndpoints = {
  auth: {
    login: '/api/auth/login',
    refresh: '/api/auth/refresh',
  },
  cita: {
    getCitas: '/api/Cita/citas',
    getCitaById: (id: number) => `/api/Cita/citas/${id}`,
    getCitasByUser: (id: number) => `/api/Cita/citas-user/${id}`,
    getCitasByEspecialista: (id: number) =>
      `/api/Cita/citas-especialista/${id}`,
    createCita: '/api/Cita/cita',
    updateCita: (id: number) => `/api/Cita/cita/${id}`,
  },
  especialidad: {
    getEspecialidades: '/api/Especialidad/especialidades',
    createEspecialidad: '/api/Especialidad/especialidades',
    getEspecialidadById: (id: number) =>
      `/api/Especialidad/especialidades/${id}`,
    updateEspecialidad: (id: number) =>
      `/api/Especialidad/especialidades/${id}`,
  },
  especialidadEspecialista: {
    getEspecialidad: '/api/EspecialidadEspecialista/especialidad',
    getEspecialidadEspecialistaById: (id: number) =>
      `/api/EspecialidadEspecialista/especialidadEspecialista/${id}`,
    createEspecialidadEspecialista:
      '/api/EspecialidadEspecialista/especialidadEspecialista',
    updateEspecialidadEspecialista: (id: number) =>
      `/api/EspecialidadEspecialista/EspecialidadEspecialista/${id}`,
  },
  especialistaCmc: {
    getEspecialistas: '/api/EspecialistaCmc/especialistas',
    createEspecialista: '/api/EspecialistaCmc/especialistas',
    getEspecialistaById: '/api/EspecialistaCmc/especialistas/',
    updateEspecialista: `/api/EspecialistaCmc/especialistas/`,
    getEspecialistasNon: '/api/EspecialistaCmc/especialistas-noActive',
    getEspecialistasByEspecialidad: (id: number) =>
      `/api/EspecialistaCmc/especialistas-por-especialidad/${id}`,
    getEspecialidadAndEstado: (idEspecialidad: number, estado: string) =>
      `/api/EspecialistaCmc/especialidad/${idEspecialidad}/estado/${estado}`,
  },
  paciente: {
    getPacientes: '/api/Paciente/pacientes',
    getPacienteById: (id: number) => `/api/Paciente/paciente/${id}`,
    updatePaciente: `/api/Paciente/paciente/`,
    createPaciente: '/api/Paciente/paciente',
  },
  rol: {
    getRoles: '/api/Rol/roles',
    createRol: '/api/Rol/roles',
    getRolById: (id: number) => `/api/Rol/roles/${id}`,
    updateRol: (id: number) => `/api/Rol/roles/${id}`,
  },
  usuario: {
    getUsuarios: '/api/Usuario/usuarios',
    getUsuarioById: (id: number) => `/api/Usuario/usuario/${id}`,
    updateUsuario: `/api/Usuario/usuario`,
    createUsuario: '/api/Usuario/usuario',
    usuariosPaciente: '/api/Usuario/usuarioPaciente',
    usuariosEspecialistas: '/api/Usuario/usuarioEspecialista',
    especialistaNon: '/api/Usuario/Especialistas-non', //esto es para los especialistas que no estan activos
  },
};
