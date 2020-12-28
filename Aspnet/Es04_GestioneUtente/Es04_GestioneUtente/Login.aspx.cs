using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Es04_GestioneUtente
{
    public partial class Login : System.Web.UI.Page
    {
        clsDB db;
        protected void Page_Load(object sender, EventArgs e)
        {
            //la connessione al db va SEMPRE fatta
            db = new clsDB("App_Data\\Biblioteca.mdf");
            if (!Page.IsPostBack)
            {
                //
            }
        }
        protected void btnLogin_Click(object sender, EventArgs e)
        {
            string idUtente;
            //posso richiamare un metodo passando
            //username e password oppure impostare
            //le property e fare poi la select
            try
            {
                db.Username = txtUsername.Text;
                db.Pwd = txtPassword.Text;
                idUtente = db.login();
                //idUtente = db.login(txtUsername.Text,db.sha256(txtPassword.Text));
                if (idUtente == "-1")
                    lblMessaggio.Text = "Login KO";
                else
                {
                    Session["idUtente"] = idUtente;
                    Response.Redirect("menu.aspx", false);
                }
            }
            catch (Exception ex)
            {
                lblMessaggio.Text = ex.Message;
            }
        }

        protected void btnRegistrati_Click(object sender, EventArgs e)
        {
            //per passare ad un'altra pagina
            Response.Redirect("registrati.aspx",true); //false l'esecuzione continua
            lblMessaggio.Text = "Ciao";
        }
    }
}