using OnlineAuction.Models;
using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using System.Linq;
using OnlineAuction.Models;


namespace OnlineAuction.Controllers
{
    public class AccountController : Controller
    {
        OnlineAuctionEntities db = new OnlineAuctionEntities();

        // GET: Account
        public ActionResult Index()
        {
            return RedirectToAction("Login");
        }

        public ActionResult Register()
        {
            return View();
        }
        public ActionResult Login()
        {
            return View();
        }

        

        public ActionResult Logout()
        {

            return RedirectToAction("Login");
        }


        public ActionResult auth(string u, string p)
        {
            try
            {
                u = Session["username"] != null ? Session["username"].ToString() : u;
                var cu = db.tblUserManagements.SingleOrDefault(ur => ur.UserName == u && ur.Password == p);

                var empl = db.tblEmployeesInfoes.SingleOrDefault(emp => emp.EmpId == cu.UsersId);
                if (cu != null)
                {
                    Session["userID"] = cu.UsersId;
<<<<<<< HEAD
                    Session["branchID"] = 1;
=======
                    //Session["branchID"] = empl.BranchId;
>>>>>>> master
                    Session["username"] = cu.UserName;
                    return RedirectToAction("Index", "Home");
                }
                else
                {
                    Session["Error"] = "The username or password is incorrect.";
                    return RedirectToAction("Login", "Account");
                }
            }
            catch (Exception)
            {
                Session["Error"] = "The username or password is incorrect.";
                return RedirectToAction("logout", "Account");
            }
        }

        public ActionResult RetrieveImage(string id, int type)
        {
            var data = db.tblBiddersInfoes.SingleOrDefault(x => x.BiddersId == id);
            byte[] img = null;

            switch (type)
            {
                case 0: img = data.UserImg;
                    break;
                case 1: img = data.CardImgFront;
                    break;
                case 2: img = data.CardImgBack;
                    break;
            }

            if (img != null)
            {
                return File(img, "image/jpeg");
            }
            else
            {
                return File("~/Images/image.png", "image/png");
            }
        }

        
    }
}