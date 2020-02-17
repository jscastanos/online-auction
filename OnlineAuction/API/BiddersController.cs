using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using OnlineAuction.Models;

namespace OnlineAuction.API
{
    public class BiddersController : ApiController
    {
        private OnlineAuctionEntities db = new OnlineAuctionEntities();

        // GET: api/Bidders
        public IQueryable<tblBiddersInfo> GettblBiddersInfoes()
        {
            return db.tblBiddersInfoes.OrderByDescending(o => o.Status == 0);
        }

        // GET: api/Bidders/5
        [ResponseType(typeof(tblBiddersInfo))]
        public async Task<IHttpActionResult> GettblBiddersInfo(int id)
        {
            tblBiddersInfo tblBiddersInfo = await db.tblBiddersInfoes.FindAsync(id);
            if (tblBiddersInfo == null)
            {
                return NotFound();
            }

            return Ok(tblBiddersInfo);
        }

        // PUT: api/Bidders/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PuttblBiddersInfo(string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var bidder = db.tblBiddersInfoes.SingleOrDefault(bid => bid.BiddersId == id);
            bidder.Status = 1; //verified
            db.Entry(bidder).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!tblBiddersInfoExists(id))
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

        // POST: api/Bidders
        [ResponseType(typeof(tblBiddersInfo))]
        public async Task<IHttpActionResult> PosttblBiddersInfo(tblBiddersInfo tblBiddersInfo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            tblBiddersInfo.BiddersId = Guid.NewGuid().ToString().Replace("-", string.Empty).Replace("+", string.Empty).Substring(0, 5).ToUpper();
            tblBiddersInfo.Status = 0;

            db.tblBiddersInfoes.Add(tblBiddersInfo);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = tblBiddersInfo.recNo }, tblBiddersInfo);
        }

        // DELETE: api/Bidders/5
        [ResponseType(typeof(tblBiddersInfo))]
        public async Task<IHttpActionResult> DeletetblBiddersInfo(int id)
        {
            tblBiddersInfo tblBiddersInfo = await db.tblBiddersInfoes.FindAsync(id);
            if (tblBiddersInfo == null)
            {
                return NotFound();
            }

            db.tblBiddersInfoes.Remove(tblBiddersInfo);
            await db.SaveChangesAsync();

            return Ok(tblBiddersInfo);
        }
        //GET: api/bidders/flag param
        /// <summary>
        /// sort bidders
        /// </summary>
        /// <param name="flag"></param>
        /// <returns>list of verified and not verified bidders</returns>
        [ResponseType(typeof(tblBiddersInfo))]
        public IHttpActionResult GetSortedBidder(int flag)
        {
            if (flag == 1)
            {
                var tbr = db.tblBiddersInfoes.OrderBy(o => o.Status == 0);
                return Ok(tbr);
            }
            else
            {
                var tbr = db.tblBiddersInfoes.OrderBy(o => o.Status == 1);
                return Ok(tbr);
            }
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tblBiddersInfoExists(string id)
        {
            return db.tblBiddersInfoes.Count(e => e.BiddersId == id) > 0;
        }
    }
}