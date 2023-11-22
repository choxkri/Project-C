﻿using Microsoft.AspNetCore.Mvc;
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

    
        public Ticket[] GetTicketsByDepartmentID(int id)
        {
            using (var context = new VisconContext())
            {

                List<int?> querry = context.Accounts
                    .Where(_ => _.DepartmentID == id)
                    .Select(_ => (int?)_.Account_ID)
                    .ToList();

                var querry1 = context.Tickets
                    .Where(a => querry.Contains(a.SolverID))
                    .ToArray();

                return querry1;
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
                var ticket = context.Tickets.Where(_ => _.Ticket_ID == id).SingleOrDefault();
                ticket.Status = status;
                var amount = context.SaveChanges();

                if (amount > 0) { return $"Status has changed to {status}"; }
                else { return "Something went wrong"; }
            }
        }

        [HttpGet("{name}/{message}/{photo}/{creatorid}/{machineid}")]
        public string CreateTicket(string name, string message, string photo, int creatorid,  int machineid)
        {
            using (var context = new VisconContext())
            {
                context.Tickets.Add(new Ticket { Ticket_Name = name, CreatorID = creatorid, Ticket_Message = message, Ticket_Photo = photo, Ticket_Date = DateTime.UtcNow, MachineID = machineid, SolverID = 1 });
                var amount = context.SaveChanges();
                if (amount > 0) { return "Added the ticket"; }
                else { return "Error occured"; }
            }
        }





    }
}
