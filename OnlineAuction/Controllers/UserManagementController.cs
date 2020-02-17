using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OnlineAuction.Controllers
{
    [SessionTimeoutAttribute]
    public class UserManagementController : Controller
    {
        // GET: UserManagement
        public ActionResult Index()
        {
            return View();
        }


        public ActionResult TagRole()
        {
            return View();
        }
    }
}