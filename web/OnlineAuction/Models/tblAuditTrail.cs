//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace OnlineAuction.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class tblAuditTrail
    {
        public int recNo { get; set; }
        public string ProductId { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> DateCreated { get; set; }
        public string Remarks { get; set; }
        public Nullable<int> Status { get; set; }
    }
}
