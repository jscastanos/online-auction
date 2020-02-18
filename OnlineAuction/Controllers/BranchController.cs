using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OnlineAuction.Controllers
{
    [SessionTimeoutAttribute]
    public class BranchController : Controller
    {
        // GET: Bidders
        public ActionResult Index()
        {
            return View();
        }
    }
}