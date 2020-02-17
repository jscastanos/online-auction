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
    public class CategoryController : ApiController
    {
        private OnlineAuctionEntities db = new OnlineAuctionEntities();

        // GET: api/Category
        public IHttpActionResult GettblProductCategories(int id, string key)
        {
            var data = db.tblProductCategories.Where(a => a.recNo > id).OrderByDescending(b => b.recNo);

            if (key != null && key != "")
            {
                data = data.Where(a => a.CategoryName.Contains(key)).OrderByDescending(b => b.recNo);
            }

            return Json(data.Take(20));
        }

        // GET: api/Category/5
        [ResponseType(typeof(tblProductCategory))]
        public IHttpActionResult GettblProductCategory(int id)
        {
            tblProductCategory tblProductCategory = db.tblProductCategories.Find(id);
            if (tblProductCategory == null)
            {
                return NotFound();
            }

            return Ok(tblProductCategory);
        }
        // PUT: api/Category/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PuttblProductCategory(int id, tblProductCategory tblProductCategory)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tblProductCategory.recNo)
            {
                return BadRequest();
            }

            db.Entry(tblProductCategory).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!tblProductCategoryExists(id))
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

        [Route("api/category/removeCat")]
        public IHttpActionResult PutRemoveProduct(int id)
        {
            db.tblProductCategories.Remove(db.tblProductCategories.SingleOrDefault(a => a.recNo == id));

            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);

        }
        // POST: api/Category
        [ResponseType(typeof(tblProductCategory))]
        public IHttpActionResult PosttblProductCategory(tblProductCategory tblProductCategory)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            tblProductCategory.CategoryId = Guid.NewGuid().ToString("N").Substring(0, 4).ToUpper();
            tblProductCategory.CategoryName = tblProductCategory.CategoryName.ToUpper();

            db.tblProductCategories.Add(tblProductCategory);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = tblProductCategory.recNo }, tblProductCategory);
        }

        // DELETE: api/Category/5
        [ResponseType(typeof(tblProductCategory))]
        public IHttpActionResult DeletetblProductCategory(int id)
        {
            tblProductCategory tblProductCategory = db.tblProductCategories.Find(id);
            if (tblProductCategory == null)
            {
                return NotFound();
            }

            db.tblProductCategories.Remove(tblProductCategory);
            db.SaveChanges();

            return Ok(tblProductCategory);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tblProductCategoryExists(int id)
        {
            return db.tblProductCategories.Count(e => e.recNo == id) > 0;
        }
    }
}