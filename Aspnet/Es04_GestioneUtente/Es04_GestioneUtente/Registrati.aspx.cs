using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Es04_GestioneUtente
{
    public partial class Registrati : System.Web.UI.Page
    {
        clsDB db;
        protected void Page_Load(object sender, EventArgs e)
        {
            //la connessione al db va SEMPRE fatta
            db = new clsDB("App_Data\\Biblioteca.mdf");
            if (!Page.IsPostBack)
            {
                popolaCmbRegioni();
            }
        }

        private void popolaCmbRegioni()
        {
            cmbRegioni.DataSource = db.caricaRegioni();
            cmbRegioni.DataValueField = "idRegione";
            cmbRegioni.DataTextField = "Regione";
            //OBBLIGATORIO per tutti gli oggetti a cui associamo un dataSource
            cmbRegioni.DataBind();
            ListItem l = new ListItem();
            l.Value = "-1";
            l.Text = "---Selezionare Regione---";
            cmbRegioni.Items.Insert(0, l);
            //In questo modo posso gestire sempre
            //selectedindexchanged
            cmbRegioni.AutoPostBack = true;
        }

        protected void cmbRegioni_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (cmbRegioni.SelectedValue == "-1")
            {
                cmbProvince.Items.Clear();
                cmbProvince.DataSource = null;
                cmbProvince.DataBind();
                cmbComuni.Items.Clear();
                cmbComuni.DataSource = null;
                cmbComuni.DataBind();
            }
            else
            {
                cmbProvince.DataSource = db.caricaProvince(cmbRegioni.SelectedValue);
                cmbProvince.DataValueField = "idProvincia";
                cmbProvince.DataTextField = "Provincia";
                cmbProvince.DataBind();
                ListItem l = new ListItem();
                l.Value = "-1";
                l.Text = "---Selezionare Provincia---";
                cmbProvince.Items.Insert(0, l);
                //In questo modo posso gestire sempre
                //selectedindexchanged
                cmbProvince.AutoPostBack = true;
            }
        }

        protected void cmbProvince_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (cmbProvince.SelectedValue == "-1")
            {
                cmbComuni.Items.Clear();
                cmbComuni.DataSource = null;
                cmbComuni.DataBind();
            }
            else
            {
                cmbComuni.DataSource = db.caricaComuni(cmbProvince.SelectedValue);
                cmbComuni.DataValueField = "idComune";
                cmbComuni.DataTextField = "Comune";
                cmbComuni.DataBind();
                ListItem l = new ListItem();
                l.Value = "-1";
                l.Text = "---Selezionare Provincia---";
                cmbComuni.Items.Insert(0, l);
                //
                cmbComuni.AutoPostBack = false;
            }
        }

        protected void btnRegistrati_Click(object sender, EventArgs e)
        {
            string idUtente;
            //TO DO controlli input validator
            try
            {
                db.Cognome = txtCognome.Text;
                db.Nome = txtNome.Text;
                //username deve essere univoco
                if (db.controllaUsername(txtUsername.Text))
                    throw new Exception("userName già presente");
                else
                    db.Username = txtUsername.Text;
                //db.sha256(txtPassword.Text);
                //fatto nella set della classe
                db.Pwd = txtPassword.Text;
                db.DataNascita = txtDataNascita.Text;
                db.IdRegione = cmbRegioni.SelectedValue;
                db.IdProvincia = cmbProvince.SelectedValue;
                db.IdComune = cmbComuni.SelectedValue;
                idUtente = db.inserisciUtente();
                lblMessaggio.Text = "Utente inserito con idUtente=" + idUtente;
            }
            catch (Exception ex)
            {
                lblMessaggio.Text = "ERRORE: " + ex.Message;
            }
        }
    }
}