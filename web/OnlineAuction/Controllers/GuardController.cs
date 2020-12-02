using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OnlineAuction.Controllers
{
    public class GuardController : Controller
    {
        // GET: Guard
        public ActionResult Index()
        {
            return RedirectToAction("unauthorized");
        }

        public ActionResult Unauthorized()
        {
            return View();
        }
    }
}