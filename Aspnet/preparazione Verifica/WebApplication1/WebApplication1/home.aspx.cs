using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebApplication1
{
    public partial class home : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void aggiornaMagazzino_Click(object sender, EventArgs e)
        {
            Response.Redirect("aggiornaMagazzino.aspx");
        }

        protected void ordinaComponenti_Click(object sender, EventArgs e)
        {
            Response.Redirect("ordinaComponenti.aspx");
        }

        protected void produciArticolo_Click(object sender, EventArgs e)
        {
            Response.Redirect("produciArticolo.aspx");
        }
    }
}