using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.EntityFrameworkCore;
using ProjectC.Controllers;
using System;

namespace ProjectC.Tests
{
    [TestClass]
    public class TicketControllerTest
    {
        [TestMethod]
        public void GetUnasignedTickets_ShouldReturnArray_WhenInvalidCredentials()
        {
            using (var context = new VisconContext())
            {
                var controller = new TicketController();

                var result = controller.GetUnassignedTickets();

                Assert.IsInstanceOfType(result, typeof(Array));
            }
        }

        [TestMethod]
        public void GetTicketsByMachineID_ShouldReturnArray_WhenInvalidCredentials()
        {
            using (var context = new VisconContext())
            {
                var controller = new TicketController();

                var result = controller.GetTicketsByMacineID(1);

                Assert.IsInstanceOfType(result, typeof(Array));
            }
        }

        [TestMethod]
        public void GetTicketsByDepartmentID_ShouldReturnArray_WhenInvalidCredentials()
        {
            using (var context = new VisconContext())
            {
                var controller = new TicketController();

                var result = controller.GetTicketsByDepartmentID(1);

                Assert.IsInstanceOfType(result, typeof(Array));
            }
        }

        [TestMethod]
        public void ACreateTicket_ShouldReturnString_WhenInvalidCredentials()
        {
            using (var context = new VisconContext())
            {
                var controller = new TicketController();

                int TesterUserId = context.Accounts.Where(_ => _.AccountName == "Tester").Select(_ => _.AccountID).FirstOrDefault();
                var result = controller.CreateTicket("Problem9951", "yes", "alot", TesterUserId, 1, "woop", "bloop");

                Assert.IsInstanceOfType(result, typeof(string));
                Assert.AreEqual("Added the ticket", result);
            }
        }

        [TestMethod]
        public void ChangeStatus_ShouldReturnString_WhenInvalidCredentials()
        {
            using (var context = new VisconContext())
            {
                var controller = new TicketController();

                var TicketId = context.Tickets.Where(_ => _.TicketName == "Problem9951").Select(_ => _.TicketID).FirstOrDefault();
                var result = controller.ChanceStatusTicket(TicketId, false, "sol");

                Assert.IsInstanceOfType(result, typeof(string));
                Assert.AreEqual("Status has changed to False", result);
            }
        }

        [TestMethod]
        public void ZDeleteTicket_ShouldReturnString_WhenInvalidCredentials()
        {
            using (var context = new VisconContext())
            {
                var controller = new TicketController();

                var TicketId = context.Tickets.Where(_ => _.TicketName == "Problem9951").Select(_ => _.TicketID).FirstOrDefault();
                var result = controller.DeleteTicket(TicketId);

                Assert.IsInstanceOfType(result, typeof(string));
                Assert.AreEqual("Deleted", result);
            }
        }
    }
}