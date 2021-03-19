using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ADOSQLServer2017_ns;
using System.Data.SqlClient;
using System.Data;

namespace WebApplication1
{
    public partial class produciArticolo : System.Web.UI.Page
    {
        clsDB db;
        protected void Page_Load(object sender, EventArgs e)
        {
            db = new clsDB("App_Data\\magazzino.mdf");

            if (!Page.IsPostBack)
            {
                caricaCmb();
            }
        }

        private void caricaCmb()
        {
            DataTable dt = db.restituisciProdottoFinito();
            cmbProdottoFinito.DataSource = dt;
            cmbProdottoFinito.DataValueField = "IDArticolo";
            cmbProdottoFinito.DataTextField = "Descrizione";
            cmbProdottoFinito.DataBind();
            ListItem l = new ListItem("-- Scegli un prodotto finito --", "-1");
            cmbProdottoFinito.Items.Add(l);
            cmbProdottoFinito.SelectedValue = "-1";
        }

        protected void btnProduci_Click(object sender, EventArgs e)
        {
            if(Convert.ToInt32(cmbProdottoFinito.SelectedValue) != -1)
            {
                int qta = db.restituisciQtaProdottoFinito(Convert.ToInt32(cmbProdottoFinito.SelectedValue));
                if(qta >= Convert.ToInt32(txtQta.Text))
                {
                    db.sottraiProdottoFinito(Convert.ToInt32(txtQta.Text), Convert.ToInt32(cmbProdottoFinito.SelectedValue));
                }
                else
                {
                    DataTable dtMateriePrime = db.restituisciMateriaPrimaPerProdottoFinito(Convert.ToInt32(cmbProdottoFinito.SelectedValue));
                    for(int i = 0; i<dtMateriePrime.Rows.Count; i++)
                    {
                        int h = 2;
                    }
                }
                
            }
        }
    }
}