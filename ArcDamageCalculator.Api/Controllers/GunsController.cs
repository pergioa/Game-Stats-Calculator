using Microsoft.AspNetCore.Mvc;
using ArcDamageCalculator.Api.Models;
using ArcDamageCalculator.Api.Repositories;

namespace ArcDamageCalculator.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GunsController(IGunRepository repository) : ControllerBase
{

    private readonly IGunRepository _gunRepository = repository;
    
    [HttpGet]
    public ActionResult<IEnumerable<Gun>> GetAll()
    {
        return Ok(_gunRepository.GetAll());
    }
}