using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using OnlineAuction.Models;
using System.Data.Entity;

namespace OnlineAuction.API
{
    [RoutePrefix("api/bidder")]
    public class BidderController : ApiController
    {

        private OnlineAuctionEntities db = new OnlineAuctionEntities();


        [Route("username/check")]
        public bool GetCheckUsernameAvailability(string username)
        {
            bool isAvailable = db.tblBiddersInfoes.Any(bidders => bidders.UserName == username);

            return !isAvailable;
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

        [Route("profile/{id}")]
        public IHttpActionResult GetProfile(string id)
        {
            var data = db.tblBiddersInfoes.Where(user => user.BiddersId == id).Select(u => new
             {
                 u.FirstName,
                 u.MiddleName,
                 u.LastName,
                 u.ContactNo,
                 u.Address,
                 u.Occupation
                
            }).SingleOrDefault();

            return Json(data);
        }

        

        public IHttpActionResult GetCheckCardImage(string id)
        {
            var data = db.tblBiddersInfoes.Where(user => user.BiddersId == id).SingleOrDefault();


            return Json(new { front = data.CardImgFront == null ? 0 : 1, back = data.CardImgBack == null ? 0 : 1 });
        }

    }
}
