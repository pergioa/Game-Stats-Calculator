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

    [HttpPost]
    public ActionResult<Grenade> Post(Grenade grenade)
    {
        var result = _grenadeRepository.Add(grenade);
        
        return CreatedAtAction(nameof(Get), result);
    }
    
    [HttpPut("{id}")]
    public ActionResult<Grenade> Put(int id, [FromBody] Grenade grenade)
    {
        var result = _grenadeRepository.Update(id, grenade);
        if(result is null) return NotFound();
        
        return Ok(result);
    }
    
    [HttpDelete("{id}")]
    public ActionResult Delete(int id)
    {
        if (!_grenadeRepository.Delete(id)) return NotFound();
        return NoContent();
    }
}