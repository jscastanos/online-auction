using OnlineAuction.API;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Threading.Tasks;

namespace OnlineAuction.Controllers
{
    [SessionTimeoutAttribute]
    public class MonitoringController : Controller
    {
        // GET: Monitoring
        public ActionResult Auction()
        {
            ViewBag.Title = "Auction Monitoring";
            return View();
        }



        public async Task<bool> SendFCM(string id)
        {

            return await PushNotification.SendPushNotification(id, "Congratulations", "You won the bidding");

        }
    }
}