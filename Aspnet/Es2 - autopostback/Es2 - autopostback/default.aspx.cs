using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Es2___autopostback
{
    public partial class _default : System.Web.UI.Page
    {
        public string[] colori = { "Nero", "Verde", "Blu", "Giallo" };
        public System.Drawing.Color[] color = { System.Drawing.Color.Black, System.Drawing.Color.Green, System.Drawing.Color.Blue, System.Drawing.Color.Yellow};

        protected void Page_Load(object sender, EventArgs e)
        {
            if(!Page.IsPostBack)
            {
                for(int i=0;i<4;i++)
                {
                    cmbColore.Items.Add(colori[i]);
                }
                Panel1.BackColor = color[0];
                chkAutoPostBack.Checked = true;
                chkAutoPostBack.AutoPostBack = true;
                cmbColore.AutoPostBack = true;
            }
            
        }

        protected void Button1_Click(object sender, EventArgs e)
        {

        }

        protected void cmbColore_SelectedIndexChanged(object sender, EventArgs e)
        {
            Panel1.BackColor = color[cmbColore.SelectedIndex];
        }

        protected void chkAutoPostBack_CheckedChanged(object sender, EventArgs e)
        {
            if(chkAutoPostBack.Checked==false)
            {
                chkAutoPostBack.AutoPostBack = false;
                cmbColore.AutoPostBack = false;
            }
            else
            {
                chkAutoPostBack.AutoPostBack = true;
                cmbColore.AutoPostBack = true;
            }
        }
    }
}