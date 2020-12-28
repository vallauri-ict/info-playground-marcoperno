using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Es04_GestioneUtente
{
    public partial class dettaglioUtente : System.Web.UI.Page
    {
        clsDB db;
        protected void Page_Load(object sender, EventArgs e)
        {
            Session["idUtente"] = "1";
            //la connessione al db va SEMPRE fatta
            db = new clsDB("App_Data\\Biblioteca.mdf");
            if (Session["idUtente"] == null)
                Response.Redirect("Login.aspx"); //non sono autenticato
            //
            if (!Page.IsPostBack)
            {
                impostaValidator();
                impostaCampi(Session["idUtente"].ToString()); //la session è globale, potrei anche non passarla come parametro
            }
                
        }

        private void impostaValidator()
        {
            //dal framework 4.5 in poi per utilizzare i validator senza jquery
            //occorre mettere nella direttiva @Page il seguente attributo UnobtrusiveValidationMode="None"
            //compare validator
            CompareValidatorPassword.ForeColor = System.Drawing.Color.Red;
            CompareValidatorPassword.Display = ValidatorDisplay.Static; //con dynamic non occupa spazio nella pagina se non è attivo
            CompareValidatorPassword.ErrorMessage = "Le Password non coincidono";
            CompareValidatorPassword.Operator = ValidationCompareOperator.Equal; //il tipo di confronto
            CompareValidatorPassword.SetFocusOnError = true; //imposta il focus sul controllo che ha dato errore
            CompareValidatorPassword.ControlToValidate = "txtPassword";
            CompareValidatorPassword.ControlToCompare = "txtPassword1";
            CompareValidatorPassword.Type = ValidationDataType.String; //il tipo di dato da controllare
            CompareValidatorPassword.ValueToCompare = ""; //se devo comparare un controllo con un valore
            //
            RangeValidatorDataNasc.ForeColor = System.Drawing.Color.Red;
            RangeValidatorDataNasc.ErrorMessage = "Data Nascita non valida";
            RangeValidatorDataNasc.SetFocusOnError = true;
            RangeValidatorDataNasc.ControlToValidate = "txtDataNascita";
            RangeValidatorDataNasc.Type = ValidationDataType.Date;
            RangeValidatorDataNasc.MinimumValue = "01/01/1920";
            RangeValidatorDataNasc.MaximumValue = DateTime.Now.ToShortDateString();
            //
            RegularExpressionValidatorMail.ForeColor = System.Drawing.Color.Red;
            RegularExpressionValidatorMail.ErrorMessage="Email non valida";
            RegularExpressionValidatorMail.ControlToValidate = "txtMail";
            RegularExpressionValidatorMail.ValidationExpression = @"\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*";
            //
            RequiredFieldValidatorNome.ForeColor = System.Drawing.Color.Red;
            RequiredFieldValidatorNome.Display = ValidatorDisplay.Static;
            RequiredFieldValidatorNome.ErrorMessage = "Nome Obbligatorio";
            RequiredFieldValidatorNome.ControlToValidate = "txtNome";
            //
            RequiredFieldValidatorDataNasc.ForeColor = System.Drawing.Color.Red;
            RequiredFieldValidatorDataNasc.Display = ValidatorDisplay.Dynamic;
            RequiredFieldValidatorDataNasc.ErrorMessage = "Data nascita Obbligatoria";
            RequiredFieldValidatorDataNasc.ControlToValidate = "txtDataNascita";
            //
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
        private void popolaCmbProvince(string idRegione)
        {
            cmbProvince.DataSource = db.caricaProvince(idRegione);
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
        private void popolaCmbComuni(string idProvincia)
        {
            cmbComuni.DataSource = db.caricaComuni(idProvincia);
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
        private void impostaCampi(string idUtente)
        {
            //posso richiamare un metodo che mi ritorna un dataTable oppure
            //posso utilizzare le property
            try
            {
                //DataTable dt;
                //dt = db.caricaUtente(idUtente);
                //txtCognome.Text = dt.Rows[0].ItemArray[1].ToString();
                //
                db.caricaUtente(idUtente);
                txtCognome.Text = db.Cognome;
                txtNome.Text = db.Nome;
                txtUsername.Text=db.Username;
                txtPassword.Text = ""; //ho soltanto lo sha256 e quindi non mi serve visualizzarlo
                txtDataNascita.Text = db.DataNascita;
                txtDataNascita.Text=txtDataNascita.Text.Substring(0, 10);
                //
                popolaCmbRegioni();
                cmbRegioni.SelectedValue = db.IdRegione;
                popolaCmbProvince(db.IdRegione);
                cmbProvince.SelectedValue = db.IdProvincia;
                popolaCmbComuni(db.IdProvincia);    
                cmbComuni.SelectedValue = db.IdComune;
            }
            catch (Exception ex)
            {
                lblMessaggio.Text = "ERRORE: " + ex.Message;
            }
            
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

        protected void btnSalva_Click(object sender, EventArgs e)
        {
            //fare UPDATE
        }
    }
}