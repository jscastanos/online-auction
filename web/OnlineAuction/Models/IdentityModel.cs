using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using OnlineAuction.Models;

namespace OnlineAuction.API
{
    public class IdentityModel
    {
        OnlineAuctionEntities db = new OnlineAuctionEntities();

        public bool IsVerified(string username, string password)
        {
            bool result = db.tblUserManagements.Any(user => user.UserName == username && user.Password == password);

            return result;
        }

        public class Credentials
        {
            public string Username { get; set; }
            public string Password { get; set; }
            public string Role { get; set; }
        }

    }
}