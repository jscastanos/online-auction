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
    public class AuctionItemsController : ApiController
    {
        private OnlineAuctionEntities db = new OnlineAuctionEntities();

        // GET: api/AuctionItems
        public IQueryable<tblAuctionItem> GettblAuctionItems()
        {
            return db.tblAuctionItems;
        }

        // GET: api/AuctionItems/5
        [ResponseType(typeof(tblAuctionItem))]
        public IHttpActionResult GettblAuctionItem(int id)
        {
            tblAuctionItem tblAuctionItem = db.tblAuctionItems.Find(id);
            if (tblAuctionItem == null)
            {
                return NotFound();
            }

            return Ok(tblAuctionItem);
        }

        [Route("api/AuctionItems/auctionData")]
        public IHttpActionResult GetAuctionData(int id, string key, string branchID)
            {
            var data = db.vAuctionProducts.Where(a => a.rowNum > id && a.productStatus == 1 && a.BranchId == branchID);

            if (key != null && key != "")
            {
                data = data.Where(a => a.ProductName.Contains(key));
            }

            if (data.Count() > 0) {
                return Json(new { data = data.Take(20), total = data.Sum(a => a.total), totalSold = data.Sum(a => a.totalProductSold) });
            }
            else
            {
                return Json(data = null);
            }
        }

            //GET = query
            //POST = add data
            //PUT = update
            //DELETE = remove


        [Route("api/AuctionItems/auctionstatus")]
        [HttpGet]
        public IHttpActionResult PutAuctionStatus(string id)
        {
            db.tblProducts.Where(a => a.ProductId == id).ToList()
                .ForEach(b => b.Status = 1);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        [Route("api/AuctionItems/auctionStatusRemove")]
        public IHttpActionResult PutAuctionStatusRemove(string id)
        {
            db.tblAuctionItems.Where(a => a.ProductId == id).ToList()
                .ForEach(b => b.Status = 1);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        [Route("api/AuctionItems/reauctionStatus")]
        public IHttpActionResult PutreauctionStatus(int id)
        {
            db.tblAuctionItems.Where(a => a.recNo == id).ToList()
                .ForEach(b => b.Status = 3);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // PUT: api/AuctionItems/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PuttblAuctionItem(int id, tblAuctionItem tblAuctionItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tblAuctionItem.recNo)
            {
                return BadRequest();
            }

            db.Entry(tblAuctionItem).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!tblAuctionItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        [Route("api/AuctionItems/claimAuction")]
        public IHttpActionResult PutclaimAuction(int id)
        {
            var data = db.tblAuctionItems.Where(a => a.recNo == id).FirstOrDefault();
            data.Status = 3;
            db.tblProducts.Where(a => a.ProductId == data.ProductId).ToList().ForEach(f => f.Status = 3);

            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        [Route("api/AuctionItems/notClaimAuction")]
        public IHttpActionResult PutNotClaimAuction(int id)
        {
            var item = db.tblAuctionItems.SingleOrDefault(auc => auc.recNo == id);
            item.Status = 2;
            db.tblProducts.SingleOrDefault(prod => prod.ProductId == item.ProductId).Status = 0;
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }


        // POST: api/AuctionItems
        [ResponseType(typeof(tblAuctionItem))]
        public IHttpActionResult PosttblAuctionItem(tblAuctionItem tblAuctionItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            tblAuctionItem.AuctionId = Guid.NewGuid().ToString("N").Substring(0, 5).ToUpper();
            tblAuctionItem.DateCreated = DateTime.Now;
            tblAuctionItem.Status = 0;

            db.tblAuctionItems.Add(tblAuctionItem);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (tblAuctionItemExists(tblAuctionItem.recNo))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = tblAuctionItem.recNo }, tblAuctionItem);
        }

        // DELETE: api/AuctionItems/5
        [ResponseType(typeof(tblAuctionItem))]
        public IHttpActionResult DeletetblAuctionItem(int id)
        {
            tblAuctionItem tblAuctionItem = db.tblAuctionItems.Find(id);
            if (tblAuctionItem == null)
            {
                return NotFound();
            }

            db.tblAuctionItems.Remove(tblAuctionItem);
            db.SaveChanges();

            return Ok(tblAuctionItem);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tblAuctionItemExists(int id)
        {
            return db.tblAuctionItems.Count(e => e.recNo == id) > 0;
        }
    }
}