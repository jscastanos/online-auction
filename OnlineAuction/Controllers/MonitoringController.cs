using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

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
    }
}