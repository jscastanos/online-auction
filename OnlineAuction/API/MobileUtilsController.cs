using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using OnlineAuction.Models;


namespace OnlineAuction.API
{
    public class MobileUtilsController : ApiController
    {
        private OnlineAuctionEntities db = new OnlineAuctionEntities();

        //Products from Category
        [Route("api/category/{id}/products")]
        public IHttpActionResult GetProductsFromCategory(string id, int index, int accountStatus)
        {
            if (accountStatus == 1)
            {

                var data = db.tblProducts.Where(product => product.CategoryId == id && product.recNo > index);

                return Json(data.Take(20));
            }
            else
            {

                var data = db.tblProducts.Where(product => product.CategoryId == id && product.recNo > index && product.Status != 1);

                return Json(data.Take(20));
            }

        }

        [Route("api/company/{id}/products")]
        public IHttpActionResult GetProductsFromCompany(string id, int index, int accountStatus)
        {
            if (accountStatus == 1)
            {

                var data = db.tblProducts.Where(product => product.BranchId == id && product.recNo > index);

                return Json(data.Take(20));
            }
            else
            {

                var data = db.tblProducts.Where(product => product.BranchId == id && product.recNo > index && product.Status != 1);

                return Json(data.Take(20));
            }

        }
    }
}
