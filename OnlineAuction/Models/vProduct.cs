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
    
    public partial class vProduct
    {
        public Nullable<long> rowNum { get; set; }
        public int recNo { get; set; }
        public string ProductName { get; set; }
        public byte[] ProductImg { get; set; }
        public string CategoryName { get; set; }
        public string ProductDescription { get; set; }
        public Nullable<int> Status { get; set; }
        public string ProductId { get; set; }
        public Nullable<decimal> totalrating { get; set; }
    }
}
