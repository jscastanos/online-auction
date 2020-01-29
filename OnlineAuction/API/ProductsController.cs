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
    public class ProductsController : ApiController
    {
        private OnlineAuctionEntities db = new OnlineAuctionEntities();

        //api/products/auctionstatus
        [Route("api/products/auctionstatus")]
        public IHttpActionResult PutAuctionStatus(int id)
        {
            db.tblProducts.Where(a => a.recNo == id).ToList().ForEach(b => b.Status = 1);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: api/Products
        public IHttpActionResult GettblProducts(int id, string key)
        {
            //if (id == 0)
            //{
            //    id = db.vProducts.Max(a => a.rowNum);
            //}

            var data = db.vProducts.Where(a => a.rowNum > id);

            if (key != null && key != "")
            {
                data = data.Where(a => a.ProductName.Contains(key));
            }

            return Json(data.Take(10));
          
        }

        // GET: api/Products/5
        [ResponseType(typeof(tblProduct))]
        public IHttpActionResult GettblProduct(int id)
        {
            tblProduct tblProduct = db.tblProducts.Find(id);
            if (tblProduct == null)
            {
                return NotFound();
            }

            return Ok(tblProduct);
        }

        // PUT: api/Products/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PuttblProduct(int id, tblProduct tblProduct)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tblProduct.recNo)
            {
                return BadRequest();
            }

            db.Entry(tblProduct).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!tblProductExists(id))
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

        // POST: api/Products
        [ResponseType(typeof(tblProduct))]
        public IHttpActionResult PosttblProduct(tblProduct tblProduct)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            tblProduct.ProductId = Guid.NewGuid().ToString("N").Substring(0, 5).ToUpper();
            tblProduct.DateCreated = DateTime.Now;
            tblProduct.Status = 0;
 
            db.tblProducts.Add(tblProduct);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = tblProduct.recNo }, tblProduct);
        }

        

        // DELETE: api/Products/5
        [ResponseType(typeof(tblProduct))]
        public IHttpActionResult DeletetblProduct(int id)
        {
            tblProduct tblProduct = db.tblProducts.Find(id);
            if (tblProduct == null)
            {
                return NotFound();
            }

            db.tblProducts.Remove(tblProduct);
            db.SaveChanges();

            return Ok(tblProduct);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tblProductExists(int id)
        {
            return db.tblProducts.Count(e => e.recNo == id) > 0;
        }
    }
}