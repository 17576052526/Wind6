<%@ WebHandler Language="C#" Class="Handler" %>

using System;
using System.Web;
using System.Collections.Generic;

public class Handler : IHttpHandler {
    public bool IsReusable { get { return false; } }
    HttpContext context;
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        this.context = context;
        string HandID = context.Request.Form["HandID"];
        if (HandID == "1")
        {
            Leave();
        }
    }
    //留言
    void Leave()
    {
        string Name = context.Request.Form["Name"];
        string Phone = context.Request.Form["Phone"];
        string Email = context.Request.Form["Email"];
        string QQ = context.Request.Form["QQ"];
        string Content = context.Request.Form["Content"];
        SendEmail(Content + "<br/>对方的姓名：" + Name + "<br/>对方的电话:" + Phone + "<br/>对方的邮箱" + Email + "<br/>对方的QQ" + QQ, "易风有客户发送留言过来了", new List<string>() { "389022755@qq.com" });
        context.Response.Write("1");
    }
    /// <summary>
    /// 发送邮箱
    /// </summary>
    /// <param name="content">内容</param>
    /// <param name="title">标题</param>
    /// <param name="email">Email</param>
    public static bool SendEmail(string Content, string Title, List<string> list)
    {
        try
        {
            System.Net.Mail.SmtpClient client = new System.Net.Mail.SmtpClient("smtp.163.com", 25);
            client.DeliveryMethod = System.Net.Mail.SmtpDeliveryMethod.Network;
            client.Credentials = new System.Net.NetworkCredential("zhang_sheJi@163.com", "19ZXS9010zc26");
            System.Net.Mail.MailMessage message = new System.Net.Mail.MailMessage();
            message.Priority = System.Net.Mail.MailPriority.Normal;
            message.From = new System.Net.Mail.MailAddress("zhang_sheJi@163.com", Title, System.Text.Encoding.GetEncoding("gb2312"));
            foreach (string str in list)
            {
                message.To.Add(str);
            }
            message.Subject = Title;
            message.Body = Content;
            message.SubjectEncoding = System.Text.Encoding.GetEncoding("gb2312");
            message.IsBodyHtml = true;
            message.BodyEncoding = System.Text.Encoding.GetEncoding("gb2312");
            client.Send(message);
            return true;
        }
        catch (Exception e)
        {
            return false;
        }
    }
}