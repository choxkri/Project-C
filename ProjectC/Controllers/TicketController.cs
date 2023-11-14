using Microsoft.AspNetCore.Mvc;
using Npgsql.PostgresTypes;
using System.Xml.Linq;

namespace ProjectC.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TicketController : Controller
    {
        [HttpGet("GetTicketsByMacineID/{id}")]
        public List<Ticket> GetTicketsByMacineID(int id)
        {
            using (var context = new VisconContext())
            {

                return new List<Ticket> { };
            }
        }

        [HttpGet("GetTicketsByDepartmentID/{id}")]
        public List<Ticket> GetTicketsByDepartmentID(int id)
        {
            using (var context = new VisconContext())
            {

                return new List<Ticket> { };
            }
        }

        [HttpGet("GetTicketsByAccountID/{id}")]
        public Ticket[] GetTicketsByAccountID(int id)
        {
            using (var context = new VisconContext())
            {   
                var tickets = context.Tickets.Where(_ => _.CreatorID == id).ToList();
                var tickets1 = context.Tickets.Where(_ => _.SolverID == id).ToList();
                List<Ticket> listoftickets = new List<Ticket>();
                listoftickets.AddRange(tickets1);
                listoftickets.AddRange(tickets);
                return listoftickets.ToArray();
            }
        }

        [HttpGet("ChanceStatusTicket/{id}/{status}")]
        public string ChanceStatusTicket(int id, bool status)
        {
            using (var context = new VisconContext())
            {

                return "nothing";
            }
        }

        [HttpGet("{name}/{message/{photo}/{creatorid}/{solverid}/{machineid}")]
        public string CreateTicket(string name, string message, string photo, int creatorid, int solverid, int machineid)
        {
            using (var context = new VisconContext())
            {

                return "nothing";
            }
        }





    }
}
