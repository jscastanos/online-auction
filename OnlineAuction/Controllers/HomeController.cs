using OnlineAuction.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OnlineAuction.Controllers
{
    public class HomeController : Controller
    {
        [CustomAuthorize(Roles = "Admin, SuperAdmin, User")]
        public ActionResult Index()
        {
   
            ViewBag.Title = "Home Page";
            return View();
        }

        [CustomAuthorize(Roles="User")]
        public ActionResult User(){
            return View();
        }
        
        [CustomAuthorize(Roles="SuperAdmin")]
        public ActionResult SuperAdmin(){
            return View();
        }
        
        [CustomAuthorize(Roles="Admin")]
        public ActionResult Admin(){
            return View();
        }
    }
}
