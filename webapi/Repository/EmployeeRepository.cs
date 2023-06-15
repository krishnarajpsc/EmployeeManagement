using webapi.Model;
using webapi.Services;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace webapi.Repository
{
    public class EmployeeRepository: IEmployeeService
    {
        AppDBContext appDBContext;
        public EmployeeRepository(AppDBContext _appDBContext)
        {
            appDBContext = _appDBContext;
        }
        public IList<Employee> GetEmployees()
        {
                return appDBContext.Employee.ToList();
        }
        public bool SaveEmployee(Employee employee)
        {
            if (employee.Id == 0)
            {
                appDBContext.Employee.Add(employee);
                appDBContext.SaveChanges();
            }
            else
            {
                appDBContext.Employee.Update(employee);
                appDBContext.SaveChanges();
            }
                return true;
        }
        public bool DeleteEmployee(Int64 id) {
            Employee employee = appDBContext.Employee.Where(x => x.Id == id).FirstOrDefault();
            appDBContext.Employee.Remove(employee);
            appDBContext.SaveChanges() ;
                return true;
        }
    }
}
