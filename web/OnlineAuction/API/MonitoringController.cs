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

namespace OnlineAuction.API
{
    [RoutePrefix("api/monitoring")]
    public class MonitoringController : ApiController
    {
        private OnlineAuctionEntities db = new OnlineAuctionEntities();


        private int getPendingCount(string branchId)
        {
            var dateNow = DateTime.Now;
            var pendingCount = db.tblAuctionItems.Where(w => w.WinnerId == null && (w.DateTimeLimit < dateNow || w.Status == 1) && (db.tblBiddings.Where(b => b.AuctionId == w.AuctionId).Count()) > 0 && w.Status != 2
                  && (db.tblProducts.FirstOrDefault(x => x.ProductId == w.ProductId).BranchId == branchId)

                ).Count();
            return pendingCount;
        }
        [Route("setwinner/{aID}/{bID}")]
        public IHttpActionResult PostSetWinner(string bID, string aID)
        {
            try
            {
                var data = db.tblAuctionItems.SingleOrDefault(a => a.AuctionId == aID);
                data.WinnerId = bID;

                tblNotification notif = new tblNotification();
                notif.biddersID = bID;
                notif.auctionID = aID;
                db.Entry(notif).State = EntityState.Added;


                db.SaveChanges();
                
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }


        [Route("auctionAction/{id}/{type}/{branchId}")]
        public IHttpActionResult PostActionAuction(int id, int type, string branchId)
        {
            try
            {
                var dateNow = DateTime.Now;
                var data = db.tblAuctionItems.SingleOrDefault(a => a.recNo == id);
                data.Status = type;
                data.DateClosed = dateNow;

                if (type == 2)
                {
                    var productData = db.tblProducts.Where(p => p.ProductId == data.ProductId).FirstOrDefault();
                    productData.Status = 0;

                }

                db.SaveChanges();
                var pendingCount = getPendingCount(branchId);
                return Json(new { stat = 1, pendingCount = pendingCount });
            }
            catch (Exception)
            {
                return StatusCode(HttpStatusCode.BadRequest);
            }
        }

        [Route("auctioneditemshistory/{branchId}")]
        public IHttpActionResult GetAuctionedItemsHistory(string branchId)
        {
            var dateNow = DateTime.Now;
            var data = db.tblAuctionItems.Where(w => (w.Status == 2 || w.WinnerId != null || ((w.DateTimeLimit < dateNow || w.Status == 1) && (db.tblBiddings.Where(b => b.AuctionId == w.AuctionId).Count()) == 0))
                && (db.tblProducts.FirstOrDefault(x=> x.ProductId == w.ProductId).BranchId == branchId)
                ).Select(s => new
            {
                s.recNo,
                s.DateTimeLimit,
                s.DateCreated,
                s.DateClosed,
                s.AskPrice,
                s.Status,
                s.AuctionId,
                s.ProductId,
                s.WinnerId,
                WinnerBidPrice = db.tblBiddings.FirstOrDefault(f => f.BiddersId == s.WinnerId).BidPrice,
                toDate = (s.Status == 1 || s.Status == 2) ? s.DateClosed : s.DateTimeLimit,
                winnerInfo = db.tblBiddersInfoes.Where(f => f.BiddersId == s.WinnerId).Select(sss => new
                {
                    sss.recNo,
                    sss.BiddersId,
                    sss.FirstName,
                    sss.LastName,
                    sss.MiddleName,
                    sss.ViolationCount
                }).FirstOrDefault(),
                productName = db.tblProducts.FirstOrDefault(f => f.ProductId == s.ProductId).ProductName,
                bidders = db.tblBiddings.Where(ww => ww.AuctionId == s.AuctionId).OrderByDescending(o => o.BidPrice).GroupBy(g => g.BiddersId).Select(ss => ss.OrderByDescending(o => o.BidPrice).FirstOrDefault()).Select(ss => new
                {
                    ss.recNo,
                    ss.AuctionId,
                    ss.BidPrice,
                    ss.DateCreated,
                    ss.Status,
                    ss.BiddersId,
                    biddersInfo = db.tblBiddersInfoes.Where(f => f.BiddersId == ss.BiddersId).Select(sss => new
                    {
                        sss.recNo,
                        sss.BiddersId,
                        sss.FirstName,
                        sss.LastName,
                        sss.MiddleName,
                        sss.ViolationCount
                    }).FirstOrDefault()
                }).Take(3)
            });

            var pendingCount = getPendingCount(branchId);
            return Json(new { d = data, st = DateTime.Now, pendingCount = pendingCount });
        }

        [Route("pendingauctioneditems/{branchId}")]
        public IHttpActionResult GetPendingAuctionedItems(string branchId)
        {
            var dateNow = DateTime.Now;
            var data = db.tblAuctionItems.Where(w => w.WinnerId == null && (w.DateTimeLimit < dateNow || w.Status == 1) && (db.tblBiddings.Where(b => b.AuctionId == w.AuctionId).Count()) > 0 && w.Status != 2
                && (db.tblProducts.FirstOrDefault(x => x.ProductId == w.ProductId).BranchId == branchId)
                ).Select(s => new
            {
                s.recNo,
                s.DateTimeLimit,
                s.DateCreated,
                s.DateClosed,
                s.Status,
                s.AskPrice,
                s.AuctionId,
                s.ProductId,
                toDate = (s.Status == 1 || s.Status == 2) ? s.DateClosed : s.DateTimeLimit,
                productName = db.tblProducts.FirstOrDefault(f => f.ProductId == s.ProductId).ProductName,
                bidders = db.tblBiddings.Where(ww => ww.AuctionId == s.AuctionId).OrderByDescending(o => o.BidPrice).GroupBy(g => g.BiddersId).Select(ss => ss.OrderByDescending(o => o.BidPrice).FirstOrDefault()).Select(ss => new
                {
                    ss.recNo,
                    ss.AuctionId,
                    ss.BidPrice,
                    ss.DateCreated,
                    ss.Status,
                    ss.BiddersId,
                    biddersInfo = db.tblBiddersInfoes.Where(f => f.BiddersId == ss.BiddersId).Select(sss => new
                    {
                        sss.recNo,
                        sss.BiddersId,
                        sss.FirstName,
                        sss.LastName,
                        sss.MiddleName,
                        sss.ViolationCount
                    }).FirstOrDefault()
                }).Take(3)
            });
            return Json(new { d = data, st = DateTime.Now });
        }
        [Route("activeauctioneditems/{branchId}")]
        public IHttpActionResult GetActiveAuctionedItems(string branchId)
        {
            var dateNow = DateTime.Now;
            var data = db.tblAuctionItems.Where(w => w.DateTimeLimit > dateNow && (w.Status == null || w.Status == 0) && w.WinnerId == null
                && (db.tblProducts.FirstOrDefault(x => x.ProductId == w.ProductId).BranchId == branchId)
                ).Select(s => new
            {
                s.recNo,
                s.DateTimeLimit,
                s.DateCreated,
                s.DateClosed,
                s.AskPrice,
                s.Status,
                s.AuctionId,
                s.ProductId,
                toDate = (s.Status == 1 || s.Status == 2) ? s.DateClosed : s.DateTimeLimit,
                productName = db.tblProducts.FirstOrDefault(f => f.ProductId == s.ProductId).ProductName,
                bidders = db.tblBiddings.Where(ww => ww.AuctionId == s.AuctionId).OrderByDescending(o => o.BidPrice).GroupBy(g => g.BiddersId).Select(ss => ss.OrderByDescending(o => o.BidPrice).FirstOrDefault()).Select(ss => new
                {
                    ss.recNo,
                    ss.AuctionId,
                    ss.BidPrice,
                    ss.DateCreated,
                    ss.Status,
                    ss.BiddersId,
                    biddersInfo = db.tblBiddersInfoes.Where(f => f.BiddersId == ss.BiddersId).Select(sss => new
                    {
                        sss.recNo,
                        sss.BiddersId,
                        sss.FirstName,
                        sss.LastName,
                        sss.MiddleName,
                        sss.ViolationCount
                    }).FirstOrDefault()
                }).Take(3)
            });

            var pendingCount = getPendingCount(branchId);
            return Json(new { d = data, st = DateTime.Now, pendingCount = pendingCount });
        }
        public class img
        {
            public string i { get; set; }
        }
        [Route("convertimage")]
        public IHttpActionResult PostImage(img i)
        {
            byte[] b = Convert.FromBase64String(i.i);
            tblProduct p = new tblProduct
            {
                ProductImg = b
            };
            db.tblProducts.Add(p);
            db.SaveChanges();
            return Json(b);
        }









    }
}