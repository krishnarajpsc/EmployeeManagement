using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using webapi.Model;
using webapi.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private IEmployeeService employeeService;
        public EmployeeController(IEmployeeService _employeeService)
        {
            employeeService = _employeeService;
        }
        // GET: api/<EmployeeController>
        [HttpGet("GetEmployee")]
        public IList<Employee> GetEmployee()
        {
            return employeeService.GetEmployees();
        }
        // POST api/<EmployeeController>
        [HttpPost]
        public void Post(Employee employee)
        {
            employeeService.SaveEmployee(employee);
        }

        // DELETE api/<EmployeeController>/5
        [HttpDelete("{id}")]
        public void Delete(Int64 id)
        {
            employeeService.DeleteEmployee(id);
        }
    }
}
