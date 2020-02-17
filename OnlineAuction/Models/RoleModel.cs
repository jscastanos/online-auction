using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using OnlineAuction.Models;

namespace OnlineAuction.API
{
    public class RoleModel : RoleProvider
    {

        public override void AddUsersToRoles(string[] usernames, string[] roleNames)
        {
            throw new NotImplementedException();
        }

        public override string ApplicationName
        {
            get
            {
                throw new NotImplementedException();
            }
            set
            {
                throw new NotImplementedException();
            }
        }

        public override void CreateRole(string roleName)
        {
            throw new NotImplementedException();
        }

        public override bool DeleteRole(string roleName, bool throwOnPopulatedRole)
        {
            throw new NotImplementedException();
        }

        public override string[] FindUsersInRole(string roleName, string usernameToMatch)
        {
            throw new NotImplementedException();
        }

        public override string[] GetAllRoles()
        {
            throw new NotImplementedException();
        }

        public override string[] GetRolesForUser(string username)
        {
            string[] user_role = new string[1];

            using (OnlineAuctionEntities _context = new OnlineAuctionEntities())
            {
                var data = (from a in _context.tblUserManagements
                            join b in _context.tblUsersRoles on a.RoleId equals b.RoleId
                            where a.UserName == username

                            select new
                            {
                                b.RoleName
                            }).FirstOrDefault();


                user_role[0] = data.RoleName;

                return user_role;
            }
        }

        public override string[] GetUsersInRole(string roleName)
        {
            throw new NotImplementedException();
        }

        public override bool IsUserInRole(string username, string roleName)
        {
            bool IsInRole = false;

            string get_rolename;

            get_rolename = GetRolesForUser(username)[0];

            if (get_rolename.Equals(roleName))
                IsInRole = true;
            

            return IsInRole;
        }

        public override void RemoveUsersFromRoles(string[] usernames, string[] roleNames)
        {
            throw new NotImplementedException();
        }

        public override bool RoleExists(string roleName)
        {
            throw new NotImplementedException();
        }
    }
}