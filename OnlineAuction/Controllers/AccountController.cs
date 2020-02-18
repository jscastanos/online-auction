using OnlineAuction.Models;
using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using System.Linq;


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
            Session.Abandon();
            Session.Clear();
            return RedirectToAction("Login");
        }


        public ActionResult auth(string u, string p)
        {
            try
            {
                u = Session["username"] != null ? Session["username"].ToString() : u;
                var cu = db.tblUserManagements.SingleOrDefault(ur => ur.UserName == u && ur.Password == p);

                if (cu != null)
                {
                    Session["userID"] = cu.UsersId;
                    Session["username"] = cu.UserName;
                    Session["Role"] = db.tblUsersRoles.SingleOrDefault(role => role.RoleId == cu.RoleId).RoleName;

                    if (cu.RoleId == "1")
                    {
                        Session["branchID"] = "NONE";
                        Session["fullName"] = "SUPER ADMIN";
                        return RedirectToAction("Index", "Admin");
                    }
                    else if (cu.RoleId == "2")
                    {

                        var comp = db.tblBranchShops.Where(b => b.userID == cu.UsersId).FirstOrDefault();

                        Session["branchID"] = comp.BranchId;
                        Session["fullName"] = comp.BranchName;
                        return RedirectToAction("Auction", "Monitoring");
                    }
                    else
                    {

                        var empl = db.tblEmployeesInfoes.SingleOrDefault(emp => emp.EmpId == cu.UsersId);
                        Session["branchID"] = empl.BranchId;

                        if(empl.MiddleName != null)
                            Session["fullName"] = fullName(empl.FirstName, empl.MiddleName, empl.LastName);
                        else
                            Session["fullName"] = fullName(empl.FirstName, "", empl.LastName);
                        return RedirectToAction("Index", "Dashboard");

                       
                    }
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

        [AllowAnonymous]
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
                return File("~/nophoto.png", "image/png");
            }
        }

        public string fullName(string a, string b, string c)
        {
            return a + " " + b + " " + c;
        }


    }
}