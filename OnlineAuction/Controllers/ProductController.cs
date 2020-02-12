﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OnlineAuction.Models;

namespace OnlineAuction.Controllers
{
    [SessionTimeoutAttribute]
    public class ProductController : Controller
    {
        OnlineAuctionEntities db = new OnlineAuctionEntities();
        // GET: Product
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ProductManagement()
        {
            return View();
        }

        public ActionResult RetrieveImage(string id)
        {
            byte[] cover = GetImageFromDataBase(id);
            if (cover != null)
            {
                return File(cover, "image/jpeg");
            }
            else
            {
                //return null;
                return File("~/Images/image.png", "image/png");
            }        
        }

        public byte[] GetImageFromDataBase(string id)
        {
            return db.tblProducts.SingleOrDefault(x => x.ProductId == id).ProductImg;
        }

    }
}