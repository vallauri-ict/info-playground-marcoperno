using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Data;
using System.Text.RegularExpressions;

namespace EsSimVerificaAsp
{
    public partial class menu : System.Web.UI.Page
    {
        clsDB db;
        public static string idCorso;
        public void Page_Load(object sender, EventArgs e)
        {
            db = new clsDB("App_Data\\verifica.mdf");

            if (!Page.IsPostBack)
            {
                caricaDgvCmb();
            }
        }

        public void caricaDgvCmb()
        {
            DataTable dt = db.restituisciCorsi();
            dgv.DataSource = dt;
            dgv.DataBind();
            cmbCorsi.AutoPostBack = true;
            cmbCorsi.DataSource = dt;
            cmbCorsi.DataValueField = "IdCorso";
            cmbCorsi.DataTextField = "Corso";
            cmbCorsi.DataBind();
            ListItem l = new ListItem("-- Sscegli un corso --", "-1");
            cmbCorsi.Items.Add(l);
            cmbCorsi.SelectedValue = "-1";

            
        }

        protected void CustValMail_ServerValidate(object source, ServerValidateEventArgs args)
        {
            Regex reg = new
                Regex(@"\w+([-+.'!#$%&amp;*]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*", RegexOptions.IgnoreCase);
            if (reg.IsMatch(args.Value))
            {
                args.IsValid = true;
            }
            else
            {
                args.IsValid = false;
            }
        }

        protected void dgv_RowCommand(object sender, GridViewCommandEventArgs e)
        {
            
            if (e.CommandName == "btnScegliCorso")
            {
                GridViewRow r;
                int index;
                string id;
                index = Convert.ToInt32(e.CommandArgument);
                idCorso = dgv.DataKeys[index].Value.ToString();

                divPrenota.Visible = true;
                lblIdLibro.Text = "Id libro : " + idCorso;
            }
        }

        protected void dgv_SelectedIndexChanged(object sender, EventArgs e)
        {
            
        }

        protected void btnPretona_Click(object sender, EventArgs e)
        {
            int idNominativo = db.restituisciIdNominativo(txtEmail.Text, pwd.Text);
            if(idNominativo!=-1)
            {
                try
                {
                    db.aggiungiIscrizione(idNominativo, Convert.ToInt32(idCorso));
                    Response.Write("<script>alert('Iscrione avvenuta con successo')</script>");
                }
                catch (Exception)
                {
                    Response.Write("<script>alert('Iscrione  non avvenuta con successo')</script>");
                }
            }
                
            else
                Response.Write("<script>alert('Dati non crretti')</script>");
        }

        protected void cmbCorsi_SelectedIndexChanged(object sender, EventArgs e)
        {
            caricaDgvIscrittiCorso(Convert.ToInt32(cmbCorsi.SelectedValue));
        }

        private void caricaDgvIscrittiCorso(int idCorso)
        {
            DataTable dt = db.restituisciIscrittiCorso(idCorso);
            dgvIscrittiCorso.DataSource = dt;
            dgvIscrittiCorso.DataBind();
        }

        protected void custmoPwd_ServerValidate(object source, ServerValidateEventArgs args)
        {
            if (args.Value.Length >= 2)
                args.IsValid = true;
            else
                args.IsValid = false;
        }
    }
}