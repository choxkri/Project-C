using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.EntityFrameworkCore;
using ProjectC.Controllers;
using System;

namespace ProjectC.Tests
{
    [TestClass]
    public class AccountControllerTests
    {
        [TestMethod]
        public void LogIn_ShouldReturnNull_WhenInvalidCredentials()
        {
            using (var context = new VisconContext())
            {
                var controller = new AccountController();

                var result = controller.LogIn("", "");

                Assert.IsNull(result);
            }
        }

        [TestMethod]
        public void LogIn_ShouldReturnAccount_WhenValidCredentials()
        {
            using (var context = new VisconContext())
            {
                var controller = new AccountController();

                var result = controller.LogIn("Tester", "TesterPassword");

                Assert.IsInstanceOfType(result, typeof(Account));
            }
        }

        [TestMethod]
        public void AddAccount_ShouldReturnString_WhenValidCredentials()
        {
            using (var context = new VisconContext())
            {
                var controller = new AccountController();

                var result = controller.AddAccount("VNA", "VNA", "", "", 1, 1, 1);

                Assert.IsInstanceOfType(result, typeof(string));
                Assert.AreEqual("Added the account", result);
            }
        }

        [TestMethod]
        public void GetType_ShouldReturnType_WhenValidCredentials()
        {
            using (var context = new VisconContext())
            {
                var controller = new AccountController();

                var pietUserId = context.Accounts.Where(_ => _.AccountName == "VNA").Select(_ => _.AccountID).FirstOrDefault();

                var result = controller.GetType(pietUserId);

                Assert.IsInstanceOfType(result, typeof(String));
                Assert.AreEqual("Employee", result);
            }
        }

        [TestMethod]
        public void GetInfoFromUser_ShouldReturnString_WhenValidCredentials()
        {
            using (var context = new VisconContext())
            {
                var controller = new AccountController();

                var pietUserId = context.Accounts.Where(_ => _.AccountName == "VNA").Select(_ => _.AccountID).FirstOrDefault();

                var resultArray = controller.GetAllInfoOfUser(pietUserId);

                var result = resultArray;

                Assert.IsNotNull(result);
            }
        }

        [TestMethod]
        public void ZDeleteAccount_ShouldReturnString_WhenValidCredentials()
        {
            using (var context = new VisconContext())
            {
                var controller = new AccountController();

                var pietUserId = context.Accounts.Where(_ => _.AccountName == "VNA").Select(_ => _.AccountID).FirstOrDefault();

                var result = controller.Delete(pietUserId);

                Assert.IsInstanceOfType(result, typeof(string));
                Assert.AreEqual("Deleted", result);
            }
        }


    }
}
