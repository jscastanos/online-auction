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


        private int getPendingCount()
        {
            var dateNow = DateTime.Now;
            var pendingCount = db.tblAuctionItems.Where(w => w.WinnerId == null && (w.DateTimeLimit < dateNow || w.Status == 1) && (db.tblBiddings.Where(b => b.AuctionId == w.AuctionId).Count()) > 0 && w.Status != 2).Count();
            return pendingCount;
        }
        [Route("setwinner/{aID}/{bID}")]
        public IHttpActionResult PostSetWinner(string bID, string aID)
        {
            try
            {
                var data = db.tblAuctionItems.SingleOrDefault(a => a.AuctionId == aID);
                data.WinnerId = bID;
                db.SaveChanges();
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [Route("auctionAction/{id}/{type}")]
        public IHttpActionResult PostActionAuction(int id, int type)
        {
            try
            {
                var dateNow = DateTime.Now;
                var data = db.tblAuctionItems.SingleOrDefault(a => a.recNo == id);
                data.Status = type;
                data.DateClosed = dateNow;
                db.SaveChanges();
                var pendingCount = getPendingCount();
                return Json(new { stat = 1, pendingCount = pendingCount });
            }
            catch (Exception)
            {
                return StatusCode(HttpStatusCode.BadRequest);
            }
        }

        [Route("auctioneditemshistory")]
        public IHttpActionResult GetAuctionedItemsHistory()
        {
            var dateNow = DateTime.Now;
            var data = db.tblAuctionItems.Where(w => w.Status == 2 || w.WinnerId != null || ((w.DateTimeLimit < dateNow || w.Status == 1) && (db.tblBiddings.Where(b => b.AuctionId == w.AuctionId).Count()) == 0)).Select(s => new
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
                bidders = db.tblBiddings.Where(ww => ww.AuctionId == s.AuctionId).Select(ss => new
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

            var pendingCount = getPendingCount();
            return Json(new { d = data, st = DateTime.Now, pendingCount = pendingCount });
        }

        [Route("pendingauctioneditems")]
        public IHttpActionResult GetPendingAuctionedItems()
        {
            var dateNow = DateTime.Now;
            var data = db.tblAuctionItems.Where(w => w.WinnerId == null && (w.DateTimeLimit < dateNow || w.Status == 1) && (db.tblBiddings.Where(b => b.AuctionId == w.AuctionId).Count()) > 0 && w.Status != 2).Select(s => new
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
                bidders = db.tblBiddings.Where(ww => ww.AuctionId == s.AuctionId).Select(ss => new
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
        [Route("activeauctioneditems")]
        public IHttpActionResult GetActiveAuctionedItems()
        {
            var dateNow = DateTime.Now;
            var data = db.tblAuctionItems.Where(w => w.DateTimeLimit > dateNow && (w.Status == null || w.Status == 0) && w.WinnerId == null).Select(s => new
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
                bidders = db.tblBiddings.Where(ww => ww.AuctionId == s.AuctionId).Select(ss => new
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

            var pendingCount = getPendingCount();
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