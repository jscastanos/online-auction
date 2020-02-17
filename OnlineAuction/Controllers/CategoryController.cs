using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OnlineAuction.Controllers
{
    [SessionTimeoutAttribute]
    public class CategoryController : Controller
    {
        // GET: Category
        public ActionResult Index()
        {
            return RedirectToAction("CategoryReference");
        }

        public ActionResult CategoryReference() {
            return View();
        }
    }
}