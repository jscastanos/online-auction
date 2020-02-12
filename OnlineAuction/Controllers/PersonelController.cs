using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OnlineAuction.Controllers
{
    [SessionTimeoutAttribute]
    public class PersonelController : Controller
    {
        // GET: Personel
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult PersonMgt()
        {
            return View();
        }
    }
}