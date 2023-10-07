using Microsoft.AspNetCore.Mvc;
using BackEdn.Data;
using BackEdn.Data.backendModels;
using BackEdn.Services;

namespace BackEdn.Controllers;


[ApiController]
[Route("api/Controller")]
public class UsuarioController : ControllerBase{

    private readonly UsuarioService _service;

    public UsuarioController(UsuarioService service)
    {
        _service = service;
    }
    [HttpGet("usuarios")]
    public IEnumerable<Usuario> Get()
    {
        return _service.GetAll();   
    }
     [HttpGet("usuario/{id}")]
    public ActionResult<Usuario> GetById(int id)
    {
        var UsuarioFind = _service.GetById(id);

        // respuesta si encontro o no el usuario con el id
        if (UsuarioFind is null)
        {
            return NotFound("El Usuario especificado no existe.");
        }
        
        return UsuarioFind;
    }

    [HttpPost("usuario")]
    public IActionResult Create(Usuario usuario)
    {
        var newUsuario = _service.Create(usuario);
        return CreatedAtAction(nameof(GetById), new {id = newUsuario.Id}, newUsuario);
    }
}