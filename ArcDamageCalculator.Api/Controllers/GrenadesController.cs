using ArcDamageCalculator.Api.Dtos;
using ArcDamageCalculator.Api.Models;
using ArcDamageCalculator.Api.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace ArcDamageCalculator.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GrenadesController(IGrenadeRepository repository) : ControllerBase
{
    private readonly IGrenadeRepository _grenadeRepository = repository;

    [HttpGet]
    public ActionResult<IEnumerable<Grenade>> Get()
    {
        return Ok(_grenadeRepository.GetAll().Select(GrenadeDto.FormGrenade));
    }
}