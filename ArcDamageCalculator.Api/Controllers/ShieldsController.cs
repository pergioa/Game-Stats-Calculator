using ArcDamageCalculator.Api.Dtos;
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
        return Ok(_shieldRepository.GetAll().Select(ShieldDto.FormShield));
    }

    [HttpPost]
    public ActionResult<Shield> Post(Shield shield)
    {
        var result = _shieldRepository.Add(shield);
        return CreatedAtAction(nameof(GetAll), result);
    }

    [HttpPut("{id}")]
    public ActionResult<Shield> Put(int id, [FromBody] Shield shield)
    {
        var result = _shieldRepository.Update(id, shield);
        if (result is null) return NotFound();
        return Ok(result);
    }

    [HttpDelete("{id}")]
    public ActionResult Delete(int id)
    {
        if (!_shieldRepository.Delete(id)) return NotFound();
        return NoContent();
    }
}