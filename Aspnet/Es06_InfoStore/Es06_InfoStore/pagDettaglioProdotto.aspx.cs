using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Es06_InfoStore
{
    public partial class pagDettaglioProdotto : System.Web.UI.Page
    {
        clsDB db;
        //class articolo
        //{
        //    public string idProdotto { get; set; }
        //    public int qta { get; set; }
        //}
        //List<articolo> carrello = new List<articolo>();
        List<string> carrello = new List<string>();
        protected void Page_Load(object sender, EventArgs e)
        {
            //controllo se sono autenticato
            if (Session["idUtente"] != null && Session["idAutorizzazione"] != null && Session["idProdotto"] != null)
            {
                db = new clsDB("App_Data\\infoStore.mdf");
                popolaProdotto(Session["idProdotto"].ToString());
            }
            else
                Response.Redirect("index.aspx");
        }

        private void popolaProdotto(string idProdotto)
        {
            //ricerca se nel carrello ho già il prodotto (modifico la quantità)
            dgv.DataSource = db.leggiProdotto(idProdotto);
            dgv.DataBind();
            divMsg.Visible = false;
        }

        protected void btnCarrello_Click(object sender, EventArgs e)
        {
            //articolo a = new articolo();
            //a.idProdotto = Session["idProdotto"].ToString();
            //a.qta = Convert.ToInt32(txtQta.Text);
            //carrello.Add(a);
            //Session["carrello"] = carrello;
            try
            {
                if (Session["carrello"] != null)
                {
                    carrello = (List<string>)Session["carrello"];
                }
                //controllo quantità disponibile
                int qta = db.quantita(Session["idProdotto"].ToString());
                if (qta >= Convert.ToInt32(txtQta.Text))
                {
                    divMsg.Visible = false;
                    //cerco se ho già il prodotto nel carrello
                    aggiungiCarrello(carrello, Session["idProdotto"].ToString(), txtQta.Text);
                    Session["carrello"] = carrello;
                    //devo andare ad impegnare la quantità dentro tabella Conservazione,
                    //in modo tale che altri utenti non la possano prenotare
                    //in global.asax devo poi andare ad annullare se l'uetnte 
                    //non conferma l'ordine (Session_End)
                    db.modificaQta(Session["idProdotto"].ToString(), txtQta.Text,'-');

                    Response.Redirect("visualizzaArticoli.aspx",false); //se l'esecuzione non continua errore thread interrotto
                }
                else
                {
                    divMsg.Visible = true;
                }
            }
            catch (Exception ex)
            {
                Session["errore"] = ex.Message;
                Response.Redirect("pagErrore.aspx");
            }
        }

        private void aggiungiCarrello(List<string> carrello, string idProdotto, string qta)
        {
            int i = 0;
            bool trovato = false;
            while(i<carrello.Count && !trovato){
                string[] v = carrello[i].Split(';');
                if (v[0] == idProdotto)
                {
                    int q = Convert.ToInt32(qta) + Convert.ToInt32(v[1]);
                    carrello[i] = v[0] + ";" + q.ToString();
                    trovato = true;
                }
                i++;
            }
            if(!trovato)
                carrello.Add(Session["idProdotto"].ToString() + ";" + txtQta.Text);
        }

        protected void btnAnnulla_Click(object sender, EventArgs e)
        {
            Response.Redirect("visualizzaArticoli.aspx");
        }
    }
}