using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Telerik.Reporting;
using OnlineAuction.Models;

namespace OnlineAuction.Reports
{
    public partial class rptWebForm : System.Web.UI.Page
    {
        InstanceReportSource i = new InstanceReportSource();

        protected void Page_Load(object sender, EventArgs e)
        {

            if (Request["t"] == "1")
            {
                i.ReportDocument = new Weekly();
                i.Parameters.Add("year", Request["year"]);
                i.Parameters.Add("week", Request["week"]);
                i.Parameters.Add("id", Request["id"]);
                i.Parameters.Add("branchId", Request["branchId"]);
            }
            else if (Request["t"] == "2")
            {
                i.ReportDocument = new Monthly();
                i.Parameters.Add("month", Request["month"]);
                i.Parameters.Add("id", Request["id"]);
                i.Parameters.Add("branchId", Request["branchId"]);
            }

            else if (Request["t"] == "3")
            {
                i.ReportDocument = new Daily();
                i.Parameters.Add("date", Request["date"]);
                i.Parameters.Add("id", Request["id"]);
                i.Parameters.Add("branchId", Request["branchId"]);
            }

            ReportViewer1.ReportSource = i;
        }
    }
}