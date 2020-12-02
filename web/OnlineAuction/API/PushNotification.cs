using Newtonsoft.Json;
using System;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using OnlineAuction.Models;

namespace OnlineAuction.API
{
    public static class PushNotification
    {

        public class Notification
        {
            public string title { get; set; }
            public string body { get; set; }
        }
        public class Message
        {
            public string to { get; set; }
            public Notification notification { get; set; }
        }

        private static Uri FireBasePushNotificationsURL = new Uri("https://fcm.googleapis.com/fcm/send");
        private static string ServerKey = "AAAAg3O4hD4:APA91bFY6Z0zCKXmvJj372Zf4HnYG8p-qPgj2WQbQNMwxa6SCkPYacUCf2Qb8BuE6x6FarafICqB4dWIv8rwiF1imfW3SthqusLoMz44UrF_aQvOcJ6aqIDp6rdmqfsD1P-VGrHmKD9i";
        

        public static async Task<bool> SendPushNotification(string id, string title, string body)
        {
            string deviceToken = null;
            HttpResponseMessage result = null;

            //get token 
            using (OnlineAuctionEntities db = new OnlineAuctionEntities())
            {
                deviceToken = db.tblBiddersInfoes.Where(b => b.BiddersId == id).Select(token => token.FCMToken).FirstOrDefault();
            }

            bool sent = false;
           
            var messageInformation = new Message()
            {
                notification = new Notification()
                {
                    title = title,
                    body = body
                },
                to = deviceToken
            };


            HttpRequestMessage httpRequest = null;

            var authorizationKey = string.Format("key={0}", ServerKey);
            var jsonBody = JsonConvert.SerializeObject(messageInformation);


            httpRequest = new HttpRequestMessage(HttpMethod.Post, "https://fcm.googleapis.com/fcm/send");

            httpRequest.Headers.TryAddWithoutValidation("Authorization", authorizationKey);
            httpRequest.Content = new StringContent(jsonBody, Encoding.UTF8, "application/json");

            using (var client = new HttpClient())
            {
                result = await client.SendAsync(httpRequest);
                sent = result.IsSuccessStatusCode;
            }

            return sent;
        }

    }
}