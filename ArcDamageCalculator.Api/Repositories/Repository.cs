using ArcDamageCalculator.Api.Data;
using Microsoft.EntityFrameworkCore;

namespace ArcDamageCalculator.Api.Repositories;

public class Repository<T>(AppDbContext context) : IRepository<T> where T : class
{
    private readonly DbSet<T> _dbSet = context.Set<T>();

    public IEnumerable<T> GetAll() => _dbSet.ToList();

    public T? GetById(int id) => _dbSet.Find(id);

    public T Add(T entity)
    {
        _dbSet.Add(entity);
        context.SaveChanges();
        return entity;
    }

    public T? Update(int id, T entity)
    {
        var existing = _dbSet.Find(id);
        if (existing is null) return null;

        context.Entry(existing).CurrentValues.SetValues(entity);
        context.SaveChanges();
        return existing;
    }

    public bool Delete(int id)
    {
        var existing = _dbSet.Find(id);
        if (existing is null) return false;

        _dbSet.Remove(existing);
        context.SaveChanges();
        return true;
    }
}
