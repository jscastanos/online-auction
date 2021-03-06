﻿
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
using System.IO;
using System.Web;

namespace OnlineAuction.API
{
    public class ProductsController : ApiController
    {
        private OnlineAuctionEntities db = new OnlineAuctionEntities();
        public class imgBase64Str
        {
            public string ProductName { get; set; }
            public string ProductDescription { get; set; }
            public string CategoryId { get; set; }
            public string ProductImg { get; set; }
            public string BranchID { get; set; }

        }
        // GET: api/Products
        public IHttpActionResult GettblProducts(int id, string key, string branchID)
        {
            var data = db.vProducts.Where(a => a.rowNum > id && a.Status != 3 && a.BranchId == branchID);

            if (key != null && key != "")
            {
                data = data.Where(a => a.ProductName.Contains(key));
            }

            return Json(data.Take(20));

        }

        // GET: api/Products/5
        [ResponseType(typeof(tblProduct))]
        public IHttpActionResult GettblProduct(int id)
        {
            vProduct tblProduct = db.vProducts.Find(id);
            if (tblProduct == null)
            {
                return NotFound();
            }

            return Ok(tblProduct);
        }

        [Route("api/products/removeProduct")]
        public IHttpActionResult PutRemoveProduct(int id)
        {
            db.tblProducts.Where(a => a.recNo == id).ToList()
                .ForEach(b => b.Status = 3);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        [Route("api/products/updateProduct")]
        public IHttpActionResult PutUpdateProduct(tblProduct tblproduct)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            db.Entry(tblproduct).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!tblProductExists(tblproduct.recNo))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Json(tblproduct);
        }

        // PUT: api/Products/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PuttblProduct(int id, imgBase64Str data)
        {
            var tblProduct = db.tblProducts.SingleOrDefault(a => a.recNo == id);

            byte[] imageBytes = data.ProductImg != null ? Convert.FromBase64String(data.ProductImg) : tblProduct.ProductImg;

            tblProduct.ProductImg = imageBytes;
            tblProduct.ProductName = data.ProductName;
            tblProduct.ProductDescription = data.ProductDescription;
            tblProduct.CategoryId = db.tblProductCategories.FirstOrDefault(a => a.CategoryName == data.CategoryId).CategoryId;
            tblProduct.DateUpdated = DateTime.Now;

            db.Entry(tblProduct).State = EntityState.Modified;
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Products
        [Route("api/products/add")]
        [HttpPost]
        public IHttpActionResult Postadd(imgBase64Str data)
        {
            tblProduct tblProduct = new tblProduct();

            byte[] imageBytes = data.ProductImg != null ? Convert.FromBase64String(data.ProductImg) : null;

            tblProduct.ProductId = Guid.NewGuid().ToString("N").Substring(0, 5).ToUpper();
            tblProduct.DateCreated = DateTime.Now;
            tblProduct.Status = 0;
            tblProduct.ProductImg = imageBytes;
            tblProduct.ProductName = data.ProductName;
            tblProduct.ProductDescription = data.ProductDescription;
            tblProduct.CategoryId = db.tblProductCategories.FirstOrDefault(a => a.CategoryName == data.CategoryId).CategoryId;
            tblProduct.BranchId = data.BranchID;

            db.Entry(tblProduct).State = EntityState.Added;
            db.SaveChanges();

            return Json(tblProduct);
        }

        [Route("api/products/rateProduct")]
        public IHttpActionResult GetrateProduct(string str, string branchID)
        {

            int id;

            if (int.TryParse(str, out id))
            {
                var data = db.tblProducts.Where(a => a.BranchId == branchID).Select(b => new
                {
                    b.ProductId,
                    b.ProductName,
                    rating = db.tblRatings.Where(c => c.ProductId == b.ProductId).Sum(d => d.Rating),
                    user = db.tblRatings.Where(c => c.ProductId == b.ProductId).Count()
                }).ToList();

                return Json(data.Take(id));
            }
            else
            {
                return Json(int.TryParse(str, out id));
            }

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