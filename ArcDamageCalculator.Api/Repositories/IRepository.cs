namespace ArcDamageCalculator.Api.Repositories;

public interface IRepository<T>
{
    IEnumerable<T> GetAll();
    T? GetById(int id);
    T Add(T entity);
    T? Update(int id, T entity);
    bool Delete(int id);
}
