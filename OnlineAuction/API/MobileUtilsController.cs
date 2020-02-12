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

        //Products from Category
        [Route("api/category/{id}/products")]
        public IHttpActionResult GetProductsFromCategory(string id, int index, int accountStatus)
        {
            if (accountStatus == 1)
            {

                var data = db.tblProducts.Where(product => product.CategoryId == id && product.recNo > index);

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

                var data = db.tblProducts.Where(product => product.BranchId == id && product.recNo > index);

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
                    d.WinnerId,
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
                                                 bidderName = db.tblBiddersInfoes.Where(b => b.BiddersId == bd.BiddersId).Select(bb => bb.UserName).FirstOrDefault()

                                             }).OrderByDescending(o => o.BidPrice).ToList()

                                         }).FirstOrDefault();

            return Json(data);
        }

        public class bidDetails
        {
            public string userID { get; set; }
            public int amount { get; set; }
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

    }

}
