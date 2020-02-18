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
    [RoutePrefix("api/auth")]
    public class AuthController : ApiController
    {
        private OnlineAuctionEntities db = new OnlineAuctionEntities();

        public class Credentials{
            public string username { get; set; }
            public string password { get; set; }
        }

        [Route("verify")]
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


    }
}