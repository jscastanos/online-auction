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
    
    public partial class tblBiddersInfo
    {
        public int recNo { get; set; }
        public string BiddersId { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string ContactNo { get; set; }
        public string Address { get; set; }
        public Nullable<System.DateTime> Bdate { get; set; }
        public string Occupation { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public Nullable<int> Status { get; set; }
        public Nullable<int> ViolationCount { get; set; }
        public byte[] UserImg { get; set; }
        public byte[] CardImgFront { get; set; }
        public byte[] CardImgBack { get; set; }
        public string FCMToken { get; set; }
    }
}
