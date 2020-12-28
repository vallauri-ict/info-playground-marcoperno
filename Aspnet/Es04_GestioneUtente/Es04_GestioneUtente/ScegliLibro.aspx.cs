using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Es04_GestioneUtente
{
    public partial class ScegliLibro : System.Web.UI.Page
    {
        clsDB db;
        string idUtente;
        protected void Page_Load(object sender, EventArgs e)
        {
            //la connessione al db va SEMPRE fatta
            db = new clsDB("App_Data\\Biblioteca.mdf");
            if (Session["idUtente"] == null)
                Response.Redirect("Login.aspx"); //non sono autenticato
            idUtente = Session["idUtente"].ToString();
            if (!Page.IsPostBack)
            {
                popolaDgvLibri();
            }
        }

        private void popolaDgvLibri()
        {
            dgvLibri.DataSource = db.caricaLibri();
            dgvLibri.DataBind();
        }

        protected void dgvLibri_RowCommand(object sender, GridViewCommandEventArgs e)
        {
            if (e.CommandName == "btnPrenota")
            {
                GridViewRow r;
                int index;
                string id;
                string titolo, autore;
                index = Convert.ToInt32(e.CommandArgument);
                id = dgvLibri.DataKeys[index].Value.ToString();
                r = dgvLibri.Rows[index];
                titolo = r.Cells[1].Text;
                autore = r.Cells[2].Text;
                //lblMessaggio.Text = "Hai selezionato: " + id + " " + titolo + " " + autore;
                prenota(id);
            }
        }

        private void prenota(string idLibro)
        {
            try
            {
                db.prenotaLibro(idLibro, idUtente);
                popolaDgvLibri();
            }
            catch (Exception ex)
            {
                lblMessaggio.Text = "Errore: "+ex.Message;
            }
        }
    }
}