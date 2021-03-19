using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Es06_InfoStore
{
    public partial class visualizzaArticoli : System.Web.UI.Page
    {
        clsDB db;
        protected void Page_Load(object sender, EventArgs e)
        {
            db = new clsDB("App_Data\\infoStore.mdf");
            if (!Page.IsPostBack)
                popolacmbFiltro();
        }

        private void popolacmbFiltro()
        {
            cmbFiltro.AutoPostBack = true;
            cmbFiltro.DataSource = db.caricaProdotti();
            cmbFiltro.DataValueField = "idTipoProdotto";
            cmbFiltro.DataTextField = "descrizione";
            cmbFiltro.DataBind();
            ListItem l = new ListItem("Tutti i prodotti", "-1");
            cmbFiltro.Items.Add(l);
            cmbFiltro.SelectedValue = "-1";
            popolaDGV("-1");
        }
        protected void cmbFiltro_SelectedIndexChanged(object sender, EventArgs e)
        {
            popolaDGV(cmbFiltro.SelectedValue);
        }
        private void popolaDGV(string idTipoprodotto)
        {
            try
            {
                DataTable dt;
                dt = db.leggiArticoli(idTipoprodotto);
                if (dt.Rows.Count == 0)
                {
                    divMsg.Visible = true;
                    dgv.Visible = false;
                }
                else
                {
                    divMsg.Visible = false;
                    dgv.Visible = true;
                    dgv.DataSource = dt;
                    dgv.DataBind();
                    //controllo se sono autenticato
                    if (Session["idUtente"] != null && Session["idAutorizzazione"] != null)
                        dgv.Columns[6].Visible = true;
                    else
                        dgv.Columns[6].Visible = false;
                }
            }
            catch (Exception ex)
            {
                Session["errore"] = ex.Message;
                Response.Redirect("pagErrore.aspx");
            }
        }
        protected void dgv_RowCommand(object sender, GridViewCommandEventArgs e)
        {
            int index;
            string id;
            index = Convert.ToInt32(e.CommandArgument);
            id = dgv.DataKeys[index].Value.ToString();
            Session["idProdotto"] = id;
            if (e.CommandName == "acquista")
                Response.Redirect("pagDettaglioProdotto.aspx", false);
        }
    }
}