using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Es06_InfoStore
{
    public partial class login : System.Web.UI.Page
    {
        clsDB db;

        protected void Page_Load(object sender, EventArgs e)
        {
            db = new clsDB("App_Data\\infoStore.mdf");
        }
        protected void btnLogin_Click(object sender, EventArgs e)
        {
            try
            {
                DataTable dt;
                dt = db.cercaUtente(txtInputEmail.Text, db.sha256(txtInputPassword.Text));
                if (dt.Rows.Count == 0)
                    lblMsg.Text = "Email o password non corretti";
                else
                {
                    Session["idUtente"] = dt.Rows[0].ItemArray[0].ToString();
                    Session["idAutorizzazione"] = dt.Rows[0].ItemArray[1].ToString();
                    Session["email"] = txtInputEmail.Text;
                    switch (dt.Rows[0].ItemArray[1].ToString())
                    {
                        case "1":
                            Response.Redirect("pagHomeAdmin.aspx", false);
                            break;
                        case "2":
                            Response.Redirect("pagHomeImpiegato.aspx", false);
                            break;
                        case "3":
                            Response.Redirect("pagHomeCliente.aspx", false);
                            break;
                    }
                }
            }
            catch (Exception ex)
            {
                Session["errore"] = ex.Message;
                Response.Redirect("pagErrore.aspx");
            }
        }
    }
}