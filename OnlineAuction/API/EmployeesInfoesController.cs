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
using System.Text;

namespace OnlineAuction.API
{
    public class EmployeesInfoesController : ApiController
    {
        private OnlineAuctionEntities db = new OnlineAuctionEntities();

        // GET: api/EmployeesInfoes
        public IQueryable<tblEmployeesInfo> GettblEmployeesInfoes()
        {
            return db.tblEmployeesInfoes;
        }

        [Route("api/EmployeesInfoes/EmployeesDeleteName")]
        public IHttpActionResult PutEmployeesDeleteName(tblEmployeesInfo r)
        {
            r.Status = 1;
            db.Entry(r).State = EntityState.Modified;
            db.SaveChanges();
            return Json("Done");
        }

        //[Route("api/EmployeesInfoes/EmployeesDeleteName")]
        //public IHttpActionResult PutEmployeesDeleteName(int r)
        //{
        //    var swabe = db.tblEmployeesInfoes.Any(k => k.recNo == r);

        //    if (!swabe)
        //    {
        //        return Json("wala uy");
        //    }
        //    else
        //    {
        //        var data = db.tblEmployeesInfoes.Where(l => l.recNo == r).SingleOrDefault();
        //        data.Status = 0;
        //        db.Entry(data).State = EntityState.Modified;
        //        db.SaveChanges();
        //        return Json(data);
        //    }

        //}

        [Route("api/EmployeesInfoes/EmployeeschangeName")]
        public IHttpActionResult PutEmployeeschangeName(tblEmployeesInfo r)
        {
            db.Entry(r).State = EntityState.Modified;
            db.SaveChanges();
            return Json("success");
        }

        // GET: api/EmployeesInfoes/
        public IHttpActionResult GettblEmployeesInfos(int id, string key)
        {
            var data = db.tblEmployeesInfoes.Where(u => u.recNo > id && u.Status != 1)
                .Select(k => new
                {
                    k.recNo,
                    k.EmpId,
                    k.BranchId,
                    k.FirstName,
                    k.MiddleName,
                    k.LastName,
                    k.Position,
                    k.Address,
                    k.Bdate,
                    k.Status,
                    ConcatName = k.FirstName + " " + k.MiddleName + " " + k.LastName

                });

            if (key != null && key != "")
            {
                data = data.Where(w => w.FirstName.Contains(key) || w.MiddleName.Contains(key) || w.LastName.Contains(key));
            }

            return Json(data.Take(10));

        }

        // GET: api/EmployeesInfoes/5
        [ResponseType(typeof(tblEmployeesInfo))]
        public IHttpActionResult GettblEmployeesInfo(int id)
        {
            tblEmployeesInfo tblEmployeesInfo = db.tblEmployeesInfoes.Find(id);
            if (tblEmployeesInfo == null)
            {
                return NotFound();
            }

            return Ok(tblEmployeesInfo);
        }

        // PUT: api/EmployeesInfoes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PuttblEmployeesInfo(int id, tblEmployeesInfo tblEmployeesInfo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tblEmployeesInfo.recNo)
            {
                return BadRequest();
            }

            db.Entry(tblEmployeesInfo).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!tblEmployeesInfoExists(id))
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

        public string GenerateCoupon(int length)
        {
            Random random = new Random();
            string characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            StringBuilder result = new StringBuilder(length);
            for (int i = 0; i < length; i++)
            {
                result.Append(characters[random.Next(characters.Length)]);
            }
            return result.ToString();
        }


        // POST: api/EmployeesInfoes
        [ResponseType(typeof(tblEmployeesInfo))]
        public IHttpActionResult PosttblEmployeesInfo(tblEmployeesInfo tblEmployeesInfo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

        genCode:
            var cID = GenerateCoupon(5);
            if (db.tblEmployeesInfoes.Where(x => x.EmpId == cID).Count() > 0)
            {
                goto genCode;
            }
            else
            {
                tblEmployeesInfo.Status = 0;
                tblEmployeesInfo.EmpId = cID;
                var aRole = db.tblEmployeesInfoes.Add(tblEmployeesInfo);
                db.SaveChanges();
                return Json(aRole);
            }


            // return CreatedAtRoute("DefaultApi", new { id = tblEmployeesInfo.recNo }, tblEmployeesInfo);
        }

        // DELETE: api/EmployeesInfoes/5
        [ResponseType(typeof(tblEmployeesInfo))]
        public IHttpActionResult DeletetblEmployeesInfo(int id)
        {
            tblEmployeesInfo tblEmployeesInfo = db.tblEmployeesInfoes.Find(id);
            if (tblEmployeesInfo == null)
            {
                return NotFound();
            }

            db.tblEmployeesInfoes.Remove(tblEmployeesInfo);
            db.SaveChanges();

            return Ok(tblEmployeesInfo);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tblEmployeesInfoExists(int id)
        {
            return db.tblEmployeesInfoes.Count(e => e.recNo == id) > 0;
        }
    }
}