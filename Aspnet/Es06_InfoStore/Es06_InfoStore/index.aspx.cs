﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Es06_InfoStore
{
    public partial class index : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            //Session["username"] = "pippo";
            //Response.Redirect("login.aspx");
        }

        protected void lnkVediProdotti_Click(object sender, EventArgs e)
        {
            Response.Redirect("vediProdotti.aspx");
        }
    }
}