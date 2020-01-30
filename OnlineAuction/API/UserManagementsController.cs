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
    public class UserManagementsController : ApiController
    {
        private OnlineAuctionEntities db = new OnlineAuctionEntities();

        public class searchemp
        {
            public string key { get; set; }
        }

        //public ActionResult nameList(string key)
        //{
        //    var snamelist = db.tPersonInfoes.Where(a => a.fname.Contains(key) || a.lname.Contains(key))
        //        .Select(x => new
        //        {
        //            x.personID,
        //            x.personalName
        //        }).Take(5)
        //        .ToList();
        //    return Json(snamelist, JsonRequestBehavior.AllowGet);
        //}

        [Route("api/UserManagements/tblEmpList")]
        public IHttpActionResult PosttblEmpList(searchemp s)
        {
            var empList = db.tblEmployeesInfoes.Where(a => a.FirstName.Contains(s.key) || a.LastName.Contains(s.key))
                .Select(x => new
                {
                    x.EmpId,
                    ConcatName = x.FirstName + " " + x.MiddleName + " " + x.LastName
                }).Take(5).ToList();
            return Json(empList);
        }

         [Route("api/UserManagements/UsersRoles")]
        public IQueryable<tblUsersRole> GetUsersRoles()
        {
            return db.tblUsersRoles;
        }

         public IHttpActionResult GettblUserManagement(int id, string key)
         {
             //var data = db.tblUserManagements.Where(u => u.recNo > id)
             //    .Select(k => new
             //    {
                     


             //    });
             return Ok();

         } 


        // GET: api/UserManagements
        public IQueryable<tblUserManagement> GettblUserManagements()
        {
            return db.tblUserManagements;
        }

        // GET: api/UserManagements/5
        [ResponseType(typeof(tblUserManagement))]
        public IHttpActionResult GettblUserManagement(int id)
        {
            tblUserManagement tblUserManagement = db.tblUserManagements.Find(id);
            if (tblUserManagement == null)
            {
                return NotFound();
            }

            return Ok(tblUserManagement);
        }

        // PUT: api/UserManagements/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PuttblUserManagement(int id, tblUserManagement tblUserManagement)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tblUserManagement.recNo)
            {
                return BadRequest();
            }

            db.Entry(tblUserManagement).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!tblUserManagementExists(id))
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

        // POST: api/UserManagements
        [ResponseType(typeof(tblUserManagement))]
        public IHttpActionResult PosttblUserManagement(tblUserManagement tblUserManagement)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var exist = db.tblUserManagements.Where(u => u.UsersId == tblUserManagement.UsersId);
            if (exist.Count() > 0)
            {
                return Json("exist");
            }
            else
            {
                tblUserManagement.DateCreated = DateTime.Now;
                tblUserManagement.Status = 0;
                var aRole = db.tblUserManagements.Add(tblUserManagement);
                db.SaveChanges();
                return Json("good");
            }
            

            //return CreatedAtRoute("DefaultApi", new { id = tblUserManagement.recNo }, tblUserManagement);
        }

        // DELETE: api/UserManagements/5
        [ResponseType(typeof(tblUserManagement))]
        public IHttpActionResult DeletetblUserManagement(int id)
        {
            tblUserManagement tblUserManagement = db.tblUserManagements.Find(id);
            if (tblUserManagement == null)
            {
                return NotFound();
            }

            db.tblUserManagements.Remove(tblUserManagement);
            db.SaveChanges();

            return Ok(tblUserManagement);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tblUserManagementExists(int id)
        {
            return db.tblUserManagements.Count(e => e.recNo == id) > 0;
        }
    }
}