using Business.Abstract;
using DataAccess.Abstract.Dal;
using DataAccess.Concrete.Dal;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ApI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private ICustomerService customerService;
        public CustomerController(ICustomerService customerService)
        {
            this.customerService = customerService;
        }

        [HttpGet("getall")]
        public IActionResult Getall()
        {
            var result = customerService.GetAll();

            if (!result.Equals(null))
                return Ok(result);
            else
                return BadRequest("Veriler alınırken bir hata oluştu.");
        }
    }
}
