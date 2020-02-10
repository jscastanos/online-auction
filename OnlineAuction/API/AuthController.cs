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

                return Json(new { id = profile.BiddersId, urn = profile.recNo, status = profile.Status});
            }else{
                return Json(0);
            }
        }

        [Route("username/check")]
        public bool GetCheckUsernameAvailability(string username)
        {
            bool isAvailable = db.tblBiddersInfoes.Any(bidders => bidders.UserName == username);

            return !isAvailable;
        }

        [Route("profileImg")]
        public string PostProfileImg([FromBody] string imgstring)
        {
            return imgstring;
        }

        [Route("register")]
        public IHttpActionResult PostRegister(tblBiddersInfo bidders)
        {
            bidders.Status = 0;
            bidders.BiddersId = Guid.NewGuid().ToString("N").Substring(0, 5).ToUpper();
            bidders.ViolationCount = 0;

            db.Entry(bidders).State = EntityState.Added;
            db.SaveChanges();

            return Json(bidders.BiddersId);


        }
        
        [Route("profile/{id}/update")]
        public IHttpActionResult PutUpdateProfile(string id, tblBiddersInfo profile)
        {
            bool profileExist = db.tblBiddersInfoes.Any(user => user.BiddersId == id);

            if (!profileExist)
                return NotFound();
            else
            {
                var data = db.tblBiddersInfoes.Where(user => user.BiddersId == id).SingleOrDefault();

                data.FirstName = profile.FirstName;
                data.MiddleName = profile.MiddleName;
                data.LastName = profile.LastName;
                data.Address = profile.Address;
                data.Occupation = profile.Occupation;
                data.ContactNo = profile.ContactNo;

                db.SaveChanges();

                return Ok();
            }

        }

        public class imageData
        {
            public string imageBase64 { get; set; }
            public int type { get; set; }
        }

        [Route("profile/{id}/image")]
        public IHttpActionResult PostsaveImgToDb(string id, imageData image)
        {
              byte[] img = Convert.FromBase64String(image.imageBase64);

            var data = db.tblBiddersInfoes.Where(user => user.BiddersId == id).SingleOrDefault();

            if (image.type == 0)
                data.UserImg = img;
            else if (image.type == 1)
                data.CardImgFront = img;
            else if (image.type == 2)
                data.CardImgBack = img;

            db.SaveChanges();

            return Json(img);
        }
    }
}