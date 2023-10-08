using Business.Abstract;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ApI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StageController : ControllerBase
    {
        private IDeliveryService deliveryService;

        public StageController(IDeliveryService _deliveryService)
        {
            this.deliveryService = _deliveryService;
        }

        [HttpGet("getall")]
        public IActionResult Getall()
        {
            var result = deliveryService.GetAll();

            if (!result.Equals(null))
                return Ok(result);
            else
                return BadRequest("Veriler alınırken bir hata oluştu.");
        }
    }
}
