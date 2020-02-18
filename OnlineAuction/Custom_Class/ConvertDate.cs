using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DDN_RMS.Controllers
{
    public class ConDate
    {
        TimeZoneInfo timeInfo = TimeZoneInfo.FindSystemTimeZoneById("Singapore Standard Time");
        
        public DateTime toSingapore(DateTime date){
            DateTime convertedDate = TimeZoneInfo.ConvertTimeFromUtc(date.ToUniversalTime(), timeInfo);
            return convertedDate;
        }
    }
}