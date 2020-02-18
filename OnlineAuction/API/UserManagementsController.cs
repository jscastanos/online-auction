﻿using System;
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


        [Route("api/UserManagements/sStatus")]
        public IHttpActionResult PutsStatus(tblUserManagement tblUserManagement)
        {
            if (tblUserManagement.Status != 1)
            {
                tblUserManagement.Status = 1;

            }
            else
            {
                tblUserManagement.Status = 0;
            }

            tblUserManagement.UpdatedBy = "UPDBY";
            tblUserManagement.DateUpdated = DateTime.Now;
            var switchery = db.Entry(tblUserManagement).State = EntityState.Modified;
            db.SaveChanges();
            return Json("success");
        }

        [Route("api/UserManagements/uRolechangeName")]
        public IHttpActionResult PutuRolechangeName(tblUserManagement tblUserManagement)
        {
            tblUserManagement.UpdatedBy = "UPDBY";
            tblUserManagement.DateUpdated = DateTime.Now;
            db.Entry(tblUserManagement).State = EntityState.Modified;
            db.SaveChanges();
            return Json("success");
        }

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


        [Route("api/UserManagements/GetAllPosition")]
        public IHttpActionResult GetAllPosition()
        {
            var availablepos = db.tblUsersRoles.Where(l => l.recNo > 3).ToList();
            return Json(availablepos);
        }

        [Route("api/UserManagements/Personel")]
        public IHttpActionResult GetPersonel()
        {
            var availableper = db.tblEmployeesInfoes.ToList();
            return Json(availableper.Count());
        }

        [Route("api/UserManagements/UsersRoles")]
        public IQueryable<tblUsersRole> GetUsersRoles()
        {
            return db.tblUsersRoles;
        }

        //api/UserManagements
        public IHttpActionResult GettblUserManagement(int id, string key, int Scode)
        {
            //  string sampleID = "SWABE";
            var predata = db.tblUserManagements.Where(u => u.recNo > id && u.Status == Scode)
                .Select(k => new
                {
                    k.recNo,
                    k.UsersId,
                    k.CreatedBy,
                    k.DateCreated,
                    k.UserName,
                    k.Password,
                    k.Status,
                    k.RoleId,
                    prestatus = db.tblEmployeesInfoes.FirstOrDefault(o => o.EmpId == k.UsersId).Status,
                    nameDisplay = db.tblEmployeesInfoes.Where(l => l.EmpId == k.UsersId)
                           .Select(c => new
                           {
                               subName = c.FirstName + " " + c.MiddleName + " " + c.LastName
                           }),
                    nameFirst = db.tblEmployeesInfoes.FirstOrDefault(l => l.EmpId == k.UsersId).FirstName,
                    nameMiddle = db.tblEmployeesInfoes.FirstOrDefault(l => l.EmpId == k.UsersId).MiddleName,
                    nameLast = db.tblEmployeesInfoes.FirstOrDefault(l => l.EmpId == k.UsersId).LastName,
                    roleDisplay = db.tblUsersRoles.FirstOrDefault(h => h.RoleId == k.RoleId).RoleName,
                    nameBranchId = db.tblEmployeesInfoes.FirstOrDefault(l => l.EmpId == k.UsersId).BranchId,
                    conName = db.tblEmployeesInfoes.FirstOrDefault(l => l.EmpId == k.UsersId).FirstName + " " + db.tblEmployeesInfoes.FirstOrDefault(l => l.EmpId == k.UsersId).MiddleName + " " + db.tblEmployeesInfoes.FirstOrDefault(l => l.EmpId == k.UsersId).LastName
                });
            // var bybranch = db.tblEmployeesInfoes.Where(u => u.EmpId == sampleID)
            var data = predata.Where(k => k.prestatus != 1);

            if (key != null && key != "")
            {
                data = data.Where(w => w.nameFirst.Contains(key) || w.nameMiddle.Contains(key) || w.nameLast.Contains(key));
            }
            return Json(data.Take(10));

        }

        [Route("api/UserManagements/CountActive")]
        public IHttpActionResult GetCountActive()
        {
            return Json(db.tblUserManagements.Where(l => l.Status == 1).Count());
        }

        [Route("api/UserManagements/CountInactive")]
        public IHttpActionResult GetCountInactive()
        {
            return Json(db.tblUserManagements.Where(l => l.Status != 1 && db.tblUsersRoles.Where(r => r.RoleId == l.RoleId && r.recNo > 3).Count() > 0).Count());
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
            bool traceID = db.tblEmployeesInfoes.Any(k => k.EmpId == tblUserManagement.UsersId);
            var preuser = db.tblEmployeesInfoes.ToList();
            var exist = db.tblUserManagements.Where(u => u.UsersId == tblUserManagement.UsersId);

            if (preuser.Count() <= 0 || !traceID)
            {
                return Json("no user");
            }
            if (exist.Count() > 0)
            {
                return Json("exist");
            }
            else
            {
                tblUserManagement.CreatedBy = "CRTBY";
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