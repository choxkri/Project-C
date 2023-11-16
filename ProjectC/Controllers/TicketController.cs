using Microsoft.AspNetCore.Mvc;

namespace ProjectC.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TicketController : Controller
    {
        [HttpGet("{id}")]
        public List<Ticket> GetTicketsByMacineID(int id)
        {
            using (var context = new VisconContext())
            {
                return new List<Ticket> { };
            }
        }



    }
}
