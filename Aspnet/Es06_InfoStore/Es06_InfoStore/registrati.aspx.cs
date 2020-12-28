using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Es06_InfoStore
{
    public partial class registrati : System.Web.UI.Page
    {
        clsDB db;

        protected void Page_Load(object sender, EventArgs e)
        {
            db = new clsDB("App_Data\\infoStore.mdf");
        }

        protected void btnRegistrati_Click(object sender, EventArgs e)
        {
            if (Page.IsValid) //tutti i validator sono messi in AND
            {
                try
                {
                    string pwdCrip = db.sha256(txtPassword.Text);
                    db.InserisciUtente(txtCognome.Text, txtNome.Text, txtDataNascita.Text, txtCitta.Text, txtTelefono.Text, txtEmail.Text, pwdCrip, txtIban.Text, 3);
                    azzera();
                    lblMessaggio.Text = "Utente inserito";
                    lblErrore.Text = "";
                }
                catch (Exception ex)
                {
                    lblErrore.Text = "ERRORE: " + ex.Message;
                }
                
            }
        }

        private void azzera()
        {
            txtCognome.Text = "";
            txtNome.Text = "";
            txtDataNascita.Text = "";
            txtCitta.Text = "";
            txtTelefono.Text = "";
            txtEmail.Text = "";
            txtIban.Text = "";
            txtPassword.Text = "";
            txtConfermaPassword.Text = "";
        }

        protected void CustValTextValidation_ServerValidate(object source, ServerValidateEventArgs args)
        {
            if (args.Value.Length >= 2)
                args.IsValid = true;
            else
                args.IsValid = false;
        }

        protected void CustValDataNascita_ServerValidate(object source, ServerValidateEventArgs args)
        {
            try
            {
                DateTime d = Convert.ToDateTime(args.Value);
                DateTime oggi = DateTime.Now;
                if ((oggi.Year - d.Year) < 18)
                    args.IsValid = false;
                else
                    args.IsValid = true;
            }
            catch (Exception)
            {
                args.IsValid = false;
            }
        }

        protected void CustValMail_ServerValidate(object source, ServerValidateEventArgs args)
        {
            Regex reg = new
                Regex(@"\w+([-+.'!#$%&amp;*]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*", RegexOptions.IgnoreCase);
            if (reg.IsMatch(args.Value))
            {
                if (db.EmailPwdPresenti(txtEmail.Text) == 0)
                {
                    args.IsValid = true;
                }
                else
                {
                    args.IsValid = false;
                }
            }
            else
            {
                args.IsValid = false;
            }
        }
    }
}