using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Es06_InfoStore
{
    public partial class upload : System.Web.UI.Page
    {
        clsDB db;
        protected void Page_Load(object sender, EventArgs e)
        {
            //if (Session["idUtente"] != null && Session["idFattura"] != null)
            //{

            //}
            //else
            //    Response.Redirect("index.aspx");
            db = new clsDB("App_Data\\infoStore.mdf");
            if (!Page.IsPostBack)
                btnAggiornaDB.Enabled = false;
        }

        protected void btnUpload_Click(object sender, EventArgs e)
        {
            string filename = FileUpload1.PostedFile.FileName;
            ViewState["filename"] = filename; //utilizzato per gestire le variabili globali alla singola pagina
            if (filename != "")
            {
                try
                {
                    FileUpload1.PostedFile.SaveAs(Server.MapPath("csv/") + filename);
                    btnAggiornaDB.Enabled = true;
                    lblMessaggio.Text = "Upload eseguito";
                }
                catch (Exception ex)
                {
                    lblMessaggio.Text = "Errore upload: " + ex.Message;
                }
            }
            else
                lblMessaggio.Text = "Selezionare un file per l'upload";
        }
        protected void btnAggiornaDB_Click(object sender, EventArgs e)
        {
            string filename;
            filename = ViewState["filename"].ToString();
            try
            {
                StreamReader fp = new StreamReader(Server.MapPath("csv/") + filename);
                while (fp.Peek() > -1)
                {
                    string s = fp.ReadLine();
                    string[] v = s.Split(';');
                    if (!db.cercaProdotto(v[0]))
                        db.inserisciProdotto(s);
                    else
                        db.modificaProdotto(s);
                }
                fp.Close();
                lblMessaggio.Text = "Dati caricati sul DB";
                btnAggiornaDB.Enabled = false;
            }
            catch (Exception ex)
            {
                lblMessaggio.Text = "Errore upload: " + ex.Message;
            }
        }
    }
}