using ArcDamageCalculator.Api.Dtos;
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
    public ActionResult<IEnumerable<Gun>> Get()
    {
        return Ok(_gunRepository.GetAll().Select(GunDto.FromGun));
    }
    
    [HttpPost]
    public ActionResult<Gun> Post(Gun gun)
    {
        var result = _gunRepository.Add(gun);
        
        return CreatedAtAction(nameof(Get), result);
    }
    
    [HttpPut("{id}")]
    public ActionResult<Gun> Put(int id, [FromBody] Gun gun)
    {
        var result = _gunRepository.Update(id, gun);
        if(result is null) return NotFound();
        
        return Ok(result);
    }
    
    [HttpDelete("{id}")]
    public ActionResult Delete(int id)
    {
        if (!_gunRepository.Delete(id)) return NotFound();
        return NoContent();
    }
}