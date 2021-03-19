using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.SessionState;

namespace Es06_InfoStore
{
    public class Global : System.Web.HttpApplication
    {

        protected void Application_Start(object sender, EventArgs e)
        {

        }

        protected void Session_Start(object sender, EventArgs e)
        {

        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {

        }

        protected void Application_AuthenticateRequest(object sender, EventArgs e)
        {

        }

        protected void Application_Error(object sender, EventArgs e)
        {

        }

        protected void Session_End(object sender, EventArgs e)
        {
            if (Session["carrello"] != null)
            {
                List<string> carrello;
                carrello = (List<string>)Session["carrello"];
                clsDB db;
                db = new clsDB("App_Data\\infoStore.mdf");
                for (int i = 0; i < carrello.Count; i++)
                {
                    string[] v = carrello[i].Split(';');
                    db.modificaQta(v[0], v[1],'+');
                }
            }
        }

        protected void Application_End(object sender, EventArgs e)
        {

        }
    }
}