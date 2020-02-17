using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OnlineAuction.Controllers
{
    [SessionTimeoutAttribute]
    public class AuctionController : Controller
    {
        // GET: Auction
        public ActionResult Index()
        {
            return RedirectToAction("AuctionManagement");
        }
        public ActionResult AuctionManagement()
        {
            return View();
        }
    }
}