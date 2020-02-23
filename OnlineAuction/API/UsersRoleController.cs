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
    public class UsersRoleController : ApiController
    {
        private OnlineAuctionEntities db = new OnlineAuctionEntities();


        //public ActionResult RoleDelete(tblUsersRole f)
        //{
        //    f.status = 1;
        //    db.Entry(f).State = EntityState.Modified;
        //    db.SaveChanges();
        //    return Json("Done", JsonRequestBehavior.AllowGet);
        //}
        [Route("api/UsersRole/RoleDeleteName")]
        public IHttpActionResult PutRoleDeleteName(tblUsersRole r)
        {
            r.status = 1;
            db.Entry(r).State = EntityState.Modified;
            db.SaveChanges();
            return Json("Done");
        }


        [Route("api/UsersRole/RolechangeName")]
        public IHttpActionResult PutRolechangeName(tblUsersRole r)
        {
            db.Entry(r).State = EntityState.Modified;
            db.SaveChanges();
            return Json("success");
        }


        // GET: api/UsersRole
        public IQueryable<tblUsersRole> GettblUsersRoles()
        {
            return db.tblUsersRoles;
        }


        // GET: api/UsersRole/
        public IHttpActionResult GettblUsersRoles(int id, string key)
        {
            var data = db.tblUsersRoles.Where(u => u.recNo > id && u.status != 1)
                .Select(k => new
                {
                    k.recNo,
                    k.RoleId,
                    k.RoleName,
                    k.status
                });

            if (key != null && key != "")
            {
                data = data.Where(w => w.RoleName.Contains(key));
            }

            return Json(data.Take(10));

        }



        // GET: api/UsersRole/5
        [ResponseType(typeof(tblUsersRole))]
        public IHttpActionResult GettblUsersRole(int id)
        {
            tblUsersRole tblUsersRole = db.tblUsersRoles.Find(id);
            if (tblUsersRole == null)
            {
                return NotFound();
            }

            return Ok(tblUsersRole);
        }

        // PUT: api/UsersRole/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PuttblUsersRole(int id, tblUsersRole tblUsersRole)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tblUsersRole.recNo)
            {
                return BadRequest();
            }

            db.Entry(tblUsersRole).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!tblUsersRoleExists(id))
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




        // POST: api/UsersRole
        [ResponseType(typeof(tblUsersRole))]
        public IHttpActionResult PosttblUsersRole(tblUsersRole tblUsersRole)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

        genCode:
            var cID = GenerateCoupon(5);
            if (db.tblUsersRoles.Where(x => x.RoleId == cID).Count() > 0)
            {
                goto genCode;
            }
            else
            {
                tblUsersRole.status = 0;
                tblUsersRole.RoleId = cID;
                var aRole = db.tblUsersRoles.Add(tblUsersRole);
                db.SaveChanges();
                return Json(aRole);
            }



            //db.tblUsersRoles.Add(tblUsersRole);

            //try
            //{
            //    db.SaveChanges();
            //}
            //catch (DbUpdateException)
            //{
            //    if (tblUsersRoleExists(tblUsersRole.recNo))
            //    {
            //        return Conflict();
            //    }
            //    else
            //    {
            //        throw;
            //    }
            //}

            // return CreatedAtRoute("DefaultApi", new { id = tblUsersRole.recNo }, tblUsersRole);
        }

        // DELETE: api/UsersRole/5
        [ResponseType(typeof(tblUsersRole))]
        public IHttpActionResult DeletetblUsersRole(int id)
        {
            tblUsersRole tblUsersRole = db.tblUsersRoles.Find(id);
            if (tblUsersRole == null)
            {
                return NotFound();
            }

            db.tblUsersRoles.Remove(tblUsersRole);
            db.SaveChanges();

            return Ok(tblUsersRole);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tblUsersRoleExists(int id)
        {
            return db.tblUsersRoles.Count(e => e.recNo == id) > 0;
        }
    }
}