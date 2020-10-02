using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Es1
{
    public partial class _default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if(Page.IsPostBack==false)
            {
                ///operazioni solo al caricamento
            }
            else
            {
                lblRis.Text= "2";
            }
        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            if (txtNome.Text == "")
                lblRis.Text += "Inseriscciiiiiiiiiiiii";
            else
                lblRis.Text += "Ciao "+txtNome.Text;
        }
    }
}