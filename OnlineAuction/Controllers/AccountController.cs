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
            if (FormsAuthentication.FormsCookieName != null)
            {

            }

            return View();
        }

        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();

            return RedirectToAction("Login");
        }

        public ActionResult Verify(string username, string password)
        {
            bool IsVerified = new IdentityModel().IsVerified(username, password);

            if (IsVerified)
            {
                FormsAuthentication.SetAuthCookie(username, false);
              
                if(Roles.IsUserInRole(username, "Admin"))
                    return RedirectToAction("Admin", "Home");

                else if(Roles.IsUserInRole(username, "Super Admin"))
                    return RedirectToAction("SuperAdmin", "Home");
                else
                    return RedirectToAction("User", "Home");
                
            }
            else
            {
                return RedirectToAction("Login");
            }
        }

        [HttpPost]
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
                    Session["branchID"] = empl.BranchId;
                    Session["username"] = cu.UserName;
                    Verify(u, p);
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