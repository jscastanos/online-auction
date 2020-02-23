using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using OnlineAuction.Models;


namespace OnlineAuction.API
{
    public class MobileUtilsController : ApiController
    {

        private OnlineAuctionEntities db = new OnlineAuctionEntities();

        public class bidDetails
        {
            public string userID { get; set; }
            public int amount { get; set; }
        }


        //Products from Category
        [Route("api/category/{id}/products")]
        public IHttpActionResult GetProductsFromCategory(string id, int index, int accountStatus)
        {
            if (accountStatus == 1)
            {

                var data = db.tblProducts.Where(product => product.CategoryId == id && product.recNo > index && product.Status <= 1);

                return Json(data.Take(20));
            }
            else
            {

                var data = db.tblProducts.Where(product => product.CategoryId == id && product.recNo > index && product.Status != 1);

                return Json(data.Take(20));
            }

        }
        //products from company
        [Route("api/company/{id}/products")]
        public IHttpActionResult GetProductsFromCompany(string id, int index, int accountStatus)
        {
            if (accountStatus == 1)
            {

                var data = db.tblProducts.Where(product => product.BranchId == id && product.recNo > index && product.Status <= 1);

                return Json(data.Take(20));
            }
            else
            {

                var data = db.tblProducts.Where(product => product.BranchId == id && product.recNo > index && product.Status != 1);

                return Json(data.Take(20));
            }

        }


        [Route("api/product/{id}/auction")]
        public IHttpActionResult GetProductAuctionDetails(string id)
        {
            var check_product = db.tblProducts.Where(p => p.ProductId == id);

            if (check_product.Count() > 0)
            {
                var product = check_product.SingleOrDefault();


                var data = db.tblAuctionItems.Where(a => a.ProductId == id).Select(d => new
                {
                    d.AuctionId,
                    d.AskPrice,
                    d.DateClosed,
                    d.DateTimeLimit,
                    winner = db.tblBiddersInfoes.Where(w => w.BiddersId == d.WinnerId).Select(b => b.UserName).FirstOrDefault(),
                    product.ProductDescription,
                    branchName = db.tblBranchShops.Where(b => b.BranchId == product.BranchId).Select(bb => bb.BranchName).FirstOrDefault(),
                    categoryName = db.tblProductCategories.Where(c => c.CategoryId == product.CategoryId).Select(cc => cc.CategoryName).FirstOrDefault()

                }).FirstOrDefault();

                return Json(data);
            }

            return Json(0);

        }

        [Route("api/product/{id}/biddings")]
        public IHttpActionResult GetProductBidding(string id, string userID)
        {
            var data = db.tblAuctionItems.Where(a => a.AuctionId == id)
                                         .Select(aa => new
                                         {
                                             userBidPrice = db.tblBiddings.Where(b => b.BiddersId == userID && b.AuctionId == aa.AuctionId).Select(p => p.BidPrice).FirstOrDefault(),
                                             highestBidPrice = db.tblBiddings.Where(b => b.AuctionId == aa.AuctionId).OrderByDescending(o => o.BidPrice).Take(1).Select(p => p.BidPrice).FirstOrDefault(),
                                             bidList = db.tblBiddings.Where(b => b.AuctionId == aa.AuctionId).Select(bd => new
                                             {
                                                 bd.BiddersId,
                                                 bd.BidPrice,
                                                 bd.DateCreated,
                                                 bidderName = db.tblBiddersInfoes.Where(b => b.BiddersId == bd.BiddersId).Select(bb => bb.UserName).FirstOrDefault(),
                                          
                                             }).OrderByDescending(o => o.BidPrice).ToList(),
                                             aa.WinnerId

                                         }).FirstOrDefault();

            return Json(data);
        }


        [Route("api/product/{id}/bid")]
        public IHttpActionResult PostBidNow(string id, bidDetails b)
        {
            tblBidding bid = new tblBidding();

            bid.BiddersId = b.userID;
            bid.AuctionId = id;
            bid.BidPrice = b.amount;
            bid.Status = 0;
            bid.DateCreated = DateTime.Now;

            db.Entry(bid).State = System.Data.Entity.EntityState.Added;
            db.SaveChanges();

            return Ok();
        }

        [Route("api/product/{id}/display")]
        public IHttpActionResult GetDisplayDetails(string id, string userID)
        {

            double result = ComputeRating(id);
            //display details
            var data = db.tblProducts.Where(p => p.ProductId == id)
                                     .Select(pp => new
                                     {
                                         pp.ProductDescription,
                                         branchName = db.tblBranchShops.Where(b => b.BranchId == pp.BranchId).Select(bb => bb.BranchName).FirstOrDefault(),
                                         categoryName = db.tblProductCategories.Where(c => c.CategoryId == pp.CategoryId).Select(cc => cc.CategoryName).FirstOrDefault(),
                                         userRating = db.tblRatings.Where(r => r.UserId == userID && r.ProductId == id).Select(rr => rr.Rating).FirstOrDefault(),
                                         productRate = result,
                                         countRate = db.tblRatings.Where(r => r.ProductId == id).Count()
                                     }).FirstOrDefault();


            return Json(data);
        }


        [Route("api/product/{id}/rate")]
        public IHttpActionResult PostDisplayRate(string id, string userID, [FromBody] int rate)
        {
            tblRating rating = new tblRating();

            rating.RateId = Guid.NewGuid().ToString("N").Substring(0, 5).ToUpper();
            rating.ProductId = id;
            rating.Rating = rate;
            rating.UserId = userID;

            db.tblRatings.Add(rating);
            db.SaveChanges();

            return Ok();


        }

        [Route("api/product/auctions")]
        public IHttpActionResult GetAuctions(int index)
        {
            var data = db.tblAuctionItems.Where(a => a.recNo > index && a.Status == 0).Select(d => new
            {
                d.recNo,
                d.ProductId,
                ProductName = db.tblProducts.Where(p => p.ProductId == d.ProductId).Select(pp => pp.ProductName).FirstOrDefault(),
                CurrentBidPrice = db.tblBiddings.Where(b => b.AuctionId == d.AuctionId).OrderByDescending(o => o.BidPrice).Select(b => b.BidPrice).Take(1).FirstOrDefault(),
                d.DateTimeLimit,
                d.AskPrice

            }).ToList();

            return Json(data);
        }

        [Route("api/product/displays")]
        public IHttpActionResult GetDisplays(int index)
        {

            var data = db.tblProducts.Where(p => p.recNo > index && p.Status == 0)
                                 .AsEnumerable()
                                 .Select(d => new
                                    {
                                        d.recNo,
                                        d.ProductId,
                                        d.ProductName,
                                        rate = ComputeRating(d.ProductId)
                                    })
                                .ToList();


            return Json(data);
        }

        [Route("api/product/search")]
        public IHttpActionResult GetSearchParams(string query)
        {
            var data = db.tblProducts.Where(p => p.ProductName.StartsWith(query))
                                     .Select(pp => new
                                     {
                                         pp.ProductId,
                                         pp.ProductName,
                                         pp.Status
                                     }).ToList();

            return Json(data);
        }

        [Route("api/bidders/biddings")]
        public IHttpActionResult GetUserBiddings(string userID)
        {
            var data = (from a in db.tblBiddings
                        join b in db.tblAuctionItems on a.AuctionId equals b.AuctionId
                        join c in db.tblProducts on b.ProductId equals c.ProductId
                        where b.WinnerId == null
                        select new
                        {
                            c.ProductId,
                            c.ProductName,
                            a.BidPrice,
                            b.DateTimeLimit,
                        }).ToList();

            return Json(data);
        }

        public double ComputeRating(string id)
        {
            double sum = 0;

            //get values
            var data = db.tblRatings.Where(r => r.ProductId == id);

            if (data.Count() > 0)
            {
                return Convert.ToDouble(data.Sum(s => s.Rating)) / data.Count();

            }

            return sum;
        }

        public class password
        {
            public string oldPassword { get; set; }
            public string newPassword { get; set; }
        }
        [Route("api/profile/{id}/updatePassword")]
        public IHttpActionResult PutUpdatePassword(string id, password password)
        {
            var data = db.tblBiddersInfoes.Where(b => b.BiddersId == id).FirstOrDefault();

            if (data.Password == password.oldPassword)
            {
                data.Password = password.newPassword;
                db.SaveChanges();
                return Json(1);
            }
            else
            {
                return Json("Old password is incorrect");
            }
        }

        public class FCMToken
        {
            public string token { get; set; }
        }
        [Route("api/profile/{id}/token")]
        public IHttpActionResult PostRegisterFCMToken(string id, FCMToken fcm)
        {
            if (fcm.token != "" || fcm.token != null)
            {
                var data = db.tblBiddersInfoes.Where(b => b.BiddersId == id).FirstOrDefault();
                data.FCMToken = fcm.token;

                db.SaveChanges();


                return Json(1);
            }
            else
            {
                return Json(0);
            }
        }

        [Route("api/profile/{id}/checktoken")]
        public bool GetCheckTokenValidity(string id, string token)
        {
            var data = db.tblBiddersInfoes.Where(b => b.BiddersId == id && b.FCMToken == token);

            return data.Count() > 0 ? true : false;
        }

        [Route("api/profile/{id}/notifs")]
        public IHttpActionResult GetNotif(string id)
        {
            var data = (from a in db.tblNotifications
                        join b in db.tblAuctionItems on a.auctionID equals b.AuctionId
                        join c in db.tblProducts on b.ProductId equals c.ProductId
                        where a.biddersID == id
                        select new { 
                            b.ProductId,
                            c.ProductName,
                            a.seen,
                            a.id
                        }).ToList();

            return Json(data);
        }

    }

}
