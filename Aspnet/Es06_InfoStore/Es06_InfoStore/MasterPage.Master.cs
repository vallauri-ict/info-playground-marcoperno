using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Es06_InfoStore
{
    public partial class MasterPage : System.Web.UI.MasterPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                lnkLogin.CausesValidation = false; //disabilita il controllo validator
                lnkLogin.Visible = true;
                lnkLogout.Visible = false;
                lnkUsername.Visible = true;
                lnkUsername.Enabled = false;
                //perchè se la session non è definita errore
                if (Session["username"] != null)
                { 
                    lnkUsername.Text = Session["username"].ToString();
                    lnkLogin.Visible = false;
                    lnkLogout.Visible = true;
                }
            }
            catch (Exception)
            {
                lnkUsername.Text = "";
                lnkUsername.Visible = false;
            }
        }

        protected void lnkLogin_Click(object sender, EventArgs e)
        {
            Response.Redirect("login.aspx");
        }

        protected void lnkLogout_Click(object sender, EventArgs e)
        {
            Session.Abandon();
        }
    }
}