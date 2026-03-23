using ArcDamageCalculator.Api.Models;
using ArcDamageCalculator.Api.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace ArcDamageCalculator.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ShieldsController(IShieldRepository repository) : ControllerBase
{
    private readonly IShieldRepository _shieldRepository = repository;

    [HttpGet]
    public ActionResult<IEnumerable<Shield>> GetAll()
    {
        return Ok(_shieldRepository.GetAll());
    }
}