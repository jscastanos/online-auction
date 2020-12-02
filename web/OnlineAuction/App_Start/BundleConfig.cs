using System.Web;
using System.Web.Optimization;

namespace OnlineAuction
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/js").Include(
                        "~/Scripts/jquery.min.js",
                        "~/Scripts/bootstrap.min.js",
                        "~/Scripts/template.js",
                        "~/Scripts/angular.min.js",
                        "~/Scripts/ng-app.js"
                        ));
            bundles.Add(new StyleBundle("~/css").Include(
                        "~/Content/icomoon.css",
                        "~/Content/font-awesome.css",
                        "~/Content/core.css",
                        "~/Content/components.css",
                        "~/Content/colors.css"
                      ));
        }
    }
}
