using Microsoft.AspNetCore.Mvc;
using Npgsql.PostgresTypes;
using System.Transactions;
using System.Xml.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjectC.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TicketController : Controller
    {
        [HttpGet("GetTicketsByMacineID/{id}")]
        public Ticket[] GetTicketsByMacineID(int id)
        {
            using (var context = new VisconContext())
            {
                var querry = context.Tickets.Where(_ => _.MachineID == id).ToArray();
                return querry;
            }
        }

        [HttpGet("GetUnassignedTickets")]
        public Ticket[] GetUnassignedTickets()
        {
            using (var context = new VisconContext())
            {
                var querry = context.Tickets.Where(_ => _.SolverID == null).ToArray();
                return querry;
            }
        }

        [HttpGet("GetSolvedTicketsByMachineID/{id}")]
        public Ticket[] GetSolvedTicketsByMachineID(int id)
        {
            using (var context = new VisconContext())
            {
                var querry = context.Tickets.Where(_ => _.MachineID == id && _.Status == true).ToArray();
                return querry;
            }
        }

            [HttpGet("AssignTicketToSelf/{accountid}/{ticketid}")]
        public string AssignTicketToSelf(int accountid, int ticketid)
        {
            using (var context = new VisconContext())
            {
                var ticket = context.Tickets.Where(_ => _.TicketID == ticketid).SingleOrDefault();
                ticket.SolverID = accountid;
                var amount = context.SaveChanges();
                if (amount > 0) { return $"Ticket has been assigned"; }
                else { return "Something went wrong"; }
            }
        }

        [HttpGet("GetTicketGroupedByDate/{accountid}/{machineid}")]
        public Ticket[] GetTicketGroupedByDate(int accountid, int machineid)
        {
            using(var context = new VisconContext())
            {
                var groupedTickets = (from tick in context.Tickets
                                     where tick.MachineID == machineid 
                                     select tick).ToArray();
                return groupedTickets;
                                           //var groupedTickets = from tick in context.Tickets
                                           //                     where tick.MachineID == machineid && tick.CreatorID == accountid

                                           //                     group tick by tick.TicketDate.Value.Date into grouped
                                           //                     select new
                                           //                     {
                                           //                         Day = grouped.Key,
                                           //                         Tickets = grouped.ToList()
                                    // };
                //return groupedTickets;
            }
        }
        public Ticket[] GetTicketsByDepartmentID(int id)
        {
            using (var context = new VisconContext())
            {

                List<int?> querry = context.Accounts
                    .Where(_ => _.DepartmentID == id)
                    .Select(_ => (int?)_.AccountID)
                    .ToList();

                var querry1 = context.Tickets
                    .Where(a => querry.Contains(a.SolverID))
                    .ToArray();

                return querry1;
            }
        }


        [HttpGet("GetDetailedTicket/{ticketid}")]

        public Object GetDetailedTicket(int ticketid)
        {
            using var context = new VisconContext();
            {

                var tickets1 = (from tick in context.Tickets
                                join mach in context.Machines on tick.MachineID equals mach.MachineID
                                join acc in context.Accounts on tick.CreatorID equals acc.AccountID
                                where tick.TicketID == ticketid
                                orderby tick.TicketDate descending
                                select new
                                {
                                    TicketID = tick.TicketID,
                                    TicketName = tick.TicketName,
                                    Status = tick.Status,
                                    MachineName = mach.MachineName,
                                    TicketDate = tick.TicketDate,
                                    TicketMessage = tick.TicketMessage,
                                    AccountName = acc.AccountName,
                                    TriedExplanation = tick.TriedExplanation,
                                    ExpectedResultExplanation = tick.ExpectedResultExplanation,
                                    HowToFixExplanation = tick.HowToFixExplanation
                                });
                return tickets1.ToArray()[0];
            }
        }
        [HttpGet("GetTicketsByAccountID/{id}")]
        public Object[] GetTicketsByAccountID(int id)
        {
            using (var context = new VisconContext())
            {
                var tickets = context.Tickets.Where(_ => _.CreatorID == id).ToList();
                var tickets1 = context.Tickets.Where(_ => _.SolverID == id).ToList();
                List<Ticket> listoftickets = new List<Ticket>();
                listoftickets.AddRange(tickets1);
                listoftickets.AddRange(tickets);
                return listoftickets.ToArray();

                //var tickets1 = (from tick in context.Tickets
                //               join mach in context.Machines on tick.MachineID equals mach.MachineID
                //               join acc in context.Accounts on tick.CreatorID equals acc.AccountID
                //               where tick.CreatorID == id
                //                orderby tick.TicketDate  descending
                //                select new
                //               {
                //                   TicketID = tick.TicketID,
                //                   TicketName = tick.TicketName,
                //                   Status = tick.Status,
                //                   MachineName = mach.MachineName,
                //                   TicketDate = tick.TicketDate,
                //                   TicketMessage = tick.TicketMessage,
                //                   AccountName = acc.AccountName,
                //                    TriedExplanation = tick.TriedExplanation,
                //                    ExpectedResultExplanation = tick.ExpectedResultExplanation,
                //                    HowToFixExplanation = tick.HowToFixExplanation
                //                }).ToList();

                //var tickets2 = (from tick in context.Tickets
                //                join mach in context.Machines on tick.MachineID equals mach.MachineID
                //                join acc in context.Accounts on tick.SolverID equals acc.AccountID
                //                where tick.SolverID == id
                //                orderby tick.TicketDate  descending
                //                select new
                //                {
                //                    TicketID = tick.TicketID,
                //                    TicketName = tick.TicketName,
                //                    Status = tick.Status,
                //                    MachineName = mach.MachineName,
                //                    TicketDate = tick.TicketDate,
                //                    TicketMessage = tick.TicketMessage,
                //                    AccountName = acc.AccountName,
                //                    TriedExplanation = tick.TriedExplanation,
                //                    ExpectedResultExplanation = tick.ExpectedResultExplanation,
                //                    HowToFixExplanation = tick.HowToFixExplanation

                //                }).ToList();
                //List<Object> listoftickets = new List<Object>();
                //listoftickets.AddRange(tickets1);
                //listoftickets.AddRange(tickets2);
                //return listoftickets.ToArray();
            }
        }

        [HttpGet("ChanceStatusTicket/{id}/{status}")]
        public string ChanceStatusTicket(int id, bool status)
        {
            using (var context = new VisconContext())
            {
                var ticket = context.Tickets.Where(_ => _.TicketID == id).SingleOrDefault();
                ticket.Status = status;
                var amount = context.SaveChanges();

                if (amount > 0) { return $"Status has changed to {status}"; }
                else { return "nothing changed"; }
            }
        }
    
        [HttpGet("{name}/{message}/{photo}/{creatorid}/{machineid}/{triedExplanition}/{expectedResultExplanation}")]
        public string CreateTicket(string name, string message, string photo, int creatorid, int machineid, string triedExplanition, string expectedResultExplanation)
        {
            using (var context = new VisconContext())
            {
                context.Tickets.Add(new Ticket { TicketName = name, Status = true, CreatorID = creatorid, TicketMessage = message, TicketPhoto = photo,
                                                 TicketDate = DateTime.UtcNow, MachineID = machineid, SolverID = null, TriedExplanation = triedExplanition,
                                                 ExpectedResultExplanation =  expectedResultExplanation , HowToFixExplanation = "No Potential Solution Available" });
                var amount = context.SaveChanges();
                if (amount > 0) { return "Added the ticket"; }
                else { return "Error occured"; }
            }
        }

        [HttpGet("{ticket}")]
        public string EditTicket(Ticket ticket)
        {
            using (var context = new VisconContext())
            {
                context.Tickets.Update(ticket);
                var amount = context.SaveChanges();
                if (amount > 0) { return "Edited the ticket"; }
                else { return "Error occured"; }
            }
        }

        [HttpGet("DeleteTicket/{id}")]
        public string DeleteTicket(int id)
        {
            using (var context = new VisconContext())
            {
                var TicketToDelete = context.Tickets.Find(id);
                if (TicketToDelete != null)
                {
                    context.Tickets.Remove(TicketToDelete);
                }
                var amount = context.SaveChanges();
                if (amount > 0) { return "Deleted"; }
                else { return "Not Found"; }
            }
        }
    }
}
