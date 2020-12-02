using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OnlineAuction.Controllers
{
    public class SessionTimeoutAttribute : ActionFilterAttribute
    {

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            HttpContext ctx = HttpContext.Current;
            try
            {
                if (HttpContext.Current.Session["userID"] == null)
                {
                    filterContext.Result = new RedirectResult("~/account/logout");
                    return;
                }
            }

            catch (Exception)
            {
                filterContext.Result = new RedirectResult("~/account/logout");
                return;
            }
            base.OnActionExecuting(filterContext);
        }
    }
}