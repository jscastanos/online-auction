﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class OnlineAuctionEntities : DbContext
    {
        public OnlineAuctionEntities()
            : base("name=OnlineAuctionEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<tblAuction> tblAuctions { get; set; }
        public virtual DbSet<tblAuditTrail> tblAuditTrails { get; set; }
        public virtual DbSet<tblBiddersInfo> tblBiddersInfoes { get; set; }
        public virtual DbSet<tblBranchShop> tblBranchShops { get; set; }
        public virtual DbSet<tblEmployeesInfo> tblEmployeesInfoes { get; set; }
        public virtual DbSet<tblProduct> tblProducts { get; set; }
        public virtual DbSet<tblProductCategory> tblProductCategories { get; set; }
        public virtual DbSet<tblRating> tblRatings { get; set; }
        public virtual DbSet<tblUserManagement> tblUserManagements { get; set; }
        public virtual DbSet<tblUsersRole> tblUsersRoles { get; set; }
        public virtual DbSet<vProduct> vProducts { get; set; }
    }
}
