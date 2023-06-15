using Microsoft.EntityFrameworkCore;

namespace webapi.Model
{
    public class AppDBContext: DbContext
    {
        public DbSet<Employee> Employee { get; set; }
        public AppDBContext(DbContextOptions<AppDBContext> options): base(options)
        {

        }
    }
}
