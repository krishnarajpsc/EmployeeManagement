using webapi.Model;

namespace webapi.Services
{
    public interface IEmployeeService
    {
        IList<Employee> GetEmployees();
        bool SaveEmployee(Employee employee);
        bool DeleteEmployee(Int64 employee);
    }
}
