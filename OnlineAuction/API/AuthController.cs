using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using OnlineAuction.Models;
using System.IO;

namespace OnlineAuction.API
{
    public class AuthController : ApiController
    {
        private OnlineAuctionEntities db = new OnlineAuctionEntities();

        public class Credentials{
            public string username { get; set; }
            public string password { get; set; }
        }

        [Route("api/auth/verify")]
        public IHttpActionResult PostVerify(Credentials creds)
        {
            var data = db.tblBiddersInfoes.Where(bidders => bidders.UserName == creds.username && bidders.Password == creds.password);

            if (data.Count() > 0)
            {
                var profile = data.SingleOrDefault();

                return Json(new { id = profile.BiddersId, urn = profile.recNo, status = profile.Status });
            }
            else
            {
                return Json(0);
            }
        }

        public class Company
        {
            public string Username { get; set; }
            public string Password { get; set; }
            public string BranchName { get; set; }
            public string Address { get; set; }
            public string EmailAddress { get; set; }
        }

        [Route("api/account/register")]
        public IHttpActionResult PostAddCompany(Company comp)
        {
            //checking sa username
            var userExist = db.tblUserManagements.Where(u => u.UserName == comp.Username);

            if (userExist.Count() > 0)
            {
                return BadRequest();
            }
            else
            {

                tblUserManagement user = new tblUserManagement();
                user.UserName = comp.Username;
                user.Password = comp.Password;
                user.RoleId = "2";
                user.UsersId = Guid.NewGuid().ToString("N").Substring(0, 5).ToUpper();
                user.DateCreated = DateTime.Now;

                db.Entry(user).State = EntityState.Added;

                tblBranchShop branch = new tblBranchShop();
                branch.BranchName = comp.BranchName;
                branch.EmailAddress = comp.EmailAddress;
                branch.Address = comp.Address;
                branch.userID = user.UsersId;
                branch.BranchId = Guid.NewGuid().ToString("N").Substring(0, 5).ToUpper();

                db.Entry(branch).State = EntityState.Added;

                db.SaveChanges();

                return Ok();
            }
            
        }


    }
}