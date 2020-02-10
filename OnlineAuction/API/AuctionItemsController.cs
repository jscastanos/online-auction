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
        public IHttpActionResult GetAuctionData(int id, string key)
        {
            var data = db.vAuctionProducts.Where(a => a.rowNum > id && a.Status < 3);

            if (key != null && key != "")
            {
                data = data.Where(a => a.ProductName.Contains(key));
            }

            return Json(new { data = data.Take(20), total = data.FirstOrDefault().total, totalSold = data.FirstOrDefault().totalProductSold });
        }

        [Route("api/AuctionItems/auctionstatus")]
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
            db.tblAuctionItems.Where(a => a.recNo == id).ToList()
                .ForEach(b => b.Status = 3);
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