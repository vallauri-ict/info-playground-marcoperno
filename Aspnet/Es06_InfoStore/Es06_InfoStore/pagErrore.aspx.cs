using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Es06_InfoStore
{
    public partial class pagErrore : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["errore"] == null)
                lblMsg.Text = "Errore Generico";
            else
                lblMsg.Text = Session["Errore"].ToString();
        }

        protected void btnIndietro_Click(object sender, EventArgs e)
        {
            //prima di ritornare alla pagina login
            //conviene pulire tutte le session
            Session.Abandon();
            Response.Redirect("login.aspx", false);
        }
    }
}