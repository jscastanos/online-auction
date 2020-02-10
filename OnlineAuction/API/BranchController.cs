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
    public class BranchController : ApiController
    {
        private OnlineAuctionEntities db = new OnlineAuctionEntities();

        // GET: api/Branch
        public IQueryable<tblBranchShop> GettblBranchShops()
        {
            return db.tblBranchShops;
        }

        // GET: api/Branch/5
        [ResponseType(typeof(tblBranchShop))]
        public async Task<IHttpActionResult> GettblBranchShop(int id)
        {
            tblBranchShop tblBranchShop = await db.tblBranchShops.FindAsync(id);
            if (tblBranchShop == null)
            {
                return NotFound();
            }

            return Ok(tblBranchShop);
        }

        // PUT: api/Branch/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PuttblBranchShop(int id, tblBranchShop tblBranchShop)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tblBranchShop.recNo)
            {
                return BadRequest();
            }

            db.Entry(tblBranchShop).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!tblBranchShopExists(id))
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

        // POST: api/Branch
        [ResponseType(typeof(tblBranchShop))]
        public async Task<IHttpActionResult> PosttblBranchShop(tblBranchShop tblBranchShop)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            tblBranchShop.BranchId = Guid.NewGuid().ToString().Replace("-", string.Empty).Replace("+", string.Empty).Substring(0, 5).ToUpper();
            tblBranchShop.Status = 1;

            db.tblBranchShops.Add(tblBranchShop);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = tblBranchShop.recNo }, tblBranchShop);
        }

        // DELETE: api/Branch/5
        [ResponseType(typeof(tblBranchShop))]
        public async Task<IHttpActionResult> DeletetblBranchShop(int id)
        {
            tblBranchShop tblBranchShop = await db.tblBranchShops.FindAsync(id);
            if (tblBranchShop == null)
            {
                return NotFound();
            }

            db.tblBranchShops.Remove(tblBranchShop);
            await db.SaveChangesAsync();

            return Ok(tblBranchShop);
        }

        // GET: api/Branch/{{id}}
        [ResponseType(typeof(tblBranchShop))]
        public IHttpActionResult GetSortedBranch(int flag)
        {
            if (flag == 1)
            {
                var tbr =  db.tblBranchShops.OrderBy(o => o.BranchName).Select(a=> a);
                return Ok(tbr);
            }
            else
            {
                var tbr = db.tblBranchShops.OrderBy(o => o.Address).Select(a => a);
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

        private bool tblBranchShopExists(int id)
        {
            return db.tblBranchShops.Count(e => e.recNo == id) > 0;
        }
    }
}