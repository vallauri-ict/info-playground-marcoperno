using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
//
using System.Net.Mail;
using iTextSharp.text;  //aggiungere riferimento alla dll  //libreria per creare pdf
using iTextSharp.text.pdf;
using System.IO;
using System.Net.Mail;


namespace Es06_InfoStore
{
    public partial class visualizzaCarrello : System.Web.UI.Page
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
            if (Session["idUtente"] != null && Session["idAutorizzazione"] != null)
            {
                if (!Page.IsPostBack)
                    popolaMetodiPagamento();
                if (Session["carrello"] != null)
                {
                    divMsg.Visible = false;
                    divDGV.Visible = true;
                    //carrello = (List<string>)Session["carrello"];
                    //object carr = (object)Session["carrello"];
                    carrello = (List<string>)Session["carrello"];
                    //gestione del carrello
                    //visualizzare articoli in dgv con pulsante modifica, elimina
                    db = new clsDB("App_Data\\infoStore.mdf");
                    popolaDgv();
                }
                else
                { 
                    divMsg.Visible = true;
                    divDGV.Visible = false;
                }
            }
            else
                Response.Redirect("index.aspx");
        }

        private void popolaMetodiPagamento()
        {
            cmbMetodoPagamento.Items.Clear();
            cmbMetodoPagamento.Items.Add("Satispay");
            cmbMetodoPagamento.Items.Add("Carta Credito");
            cmbMetodoPagamento.Items.Add("Bancomat");
            cmbMetodoPagamento.Items.Add("Bonifico Bancario");
        }

        private void popolaDgv()
        {
            int prezzoTot = 0;
            DataTable dt = new DataTable();
            DataRow r;
            dt.Clear();
            dt.Columns.Add("idProdotto");
            dt.Columns.Add("Nome");
            dt.Columns.Add("Prezzo");
            dt.Columns.Add("Qta");
            
            for (int i = 0; i < carrello.Count; i++)
            {
                DataTable d = new DataTable();
                r = dt.NewRow();
                string[] v = carrello[i].Split(';');
                d = db.leggiProdotto(v[0]);

                r["idProdotto"] = v[0];
                r["Nome"] = d.Rows[0].ItemArray[3];
                r["Prezzo"] = d.Rows[0].ItemArray[2];
                r["Qta"] = v[1];
                dt.Rows.Add(r);
                //calcolo il prezzo
                prezzoTot += Convert.ToInt32(r["Prezzo"]) * Convert.ToInt32(r["Qta"]);
            }
            //carico nel viewState il prezzo totale, così ce l'ho nel roundtrip
            ViewState["prezzoTot"] = prezzoTot;
            dgv.DataSource = dt;
            dgv.DataBind();
        }
        protected void dgv_RowCommand(object sender, GridViewCommandEventArgs e)
        {
            int index;
            string id;
            index = Convert.ToInt32(e.CommandArgument);
            id = dgv.DataKeys[index].Value.ToString();
            Session["idProdotto"] = id;
            if (e.CommandName == "elimina")
            { 
                elimina(id);
                popolaDgv();
            }
        }

        private void elimina(string idProdotto)
        {
            int i = 0;
            bool trovato = false;
            while (i < carrello.Count && !trovato)
            {
                string[] v = carrello[i].Split(';');
                if (v[0] == idProdotto)
                {
                    db.modificaQta(v[0], v[1], '+');
                    carrello.RemoveAt(i);
                    trovato = true;
                }
                i++;
            }
            if (!trovato)
            { 
                Session["carrello"] = carrello;
            }
        }

        protected void btnConferma_Click(object sender, EventArgs e)
        {
            string idFattura;
            string idCarrello;
            idFattura =  db.creaFattura(ViewState["prezzoTot"].ToString(), true);
            idCarrello = db.creaCarrello(cmbMetodoPagamento.SelectedItem.Text,true,idFattura, Session["idUtente"].ToString());
            for (int i = 0; i < carrello.Count; i++)
            {
                string[] v = carrello[i].Split(';');
                db.InserisciCarrello(v[0], idCarrello, v[1]);
            }
            creaPDF(idFattura);
            inviaMail(idFattura);
            carrello.Clear();
            Session["carrello"] = null;
            Session["idFattura"] = idFattura;
            Response.Redirect("confermaOrdine.aspx");
        }

        private void inviaMail(string idFattura)
        {
            try
            {
                MailMessage m = new MailMessage();
                m.From = new MailAddress("admin@infostore.com");
                m.To.Add(new MailAddress(Session["email"].ToString())); //MailAddressCollection(....)
                //m.CC.Add(new MailAddress(txtCc.Text));
                //m.Bcc.Add(new MailAddress(txtBcc.Text));
                m.Subject = "Fattura: " + idFattura;
                m.Body = "Con la presente inviamo fattura";
                
                m.Attachments.Add(new Attachment(Server.MapPath(
                "Fatture/fatt_" + idFattura + ".pdf")));
                //
                //credenziali
                System.Net.NetworkCredential crd = new System.Net.NetworkCredential();
                crd.UserName = "admin@infostore.com";
                crd.Password = "password";
                //
                SmtpClient s = new SmtpClient();
                s.Host = "smtp.gmail.com";
                s.Port = 587; // 25;
                s.Credentials = crd;
                s.EnableSsl = true; //https
                s.Send(m);
            }
            catch (Exception ex)
            {
                //Session["errore"] = ex.Message;
                //Response.Redirect("pagErrore.aspx");
            }
        }

        private void creaPDF(string idFattura)
        {
            Document doc = new Document(PageSize.A4, 30, 30, 25, 25);
            PdfWriter writer;
            //MemoryStream str = new MemoryStream();  //serve per invio con response.write
            string nomePDF = Server.MapPath("Fatture/fatt_" + idFattura + ".pdf");
            FileStream str = new FileStream(nomePDF, FileMode.Append);
            //
            Font fontTitolo = FontFactory.GetFont("Arial", 14, Font.BOLD);
            Font fontTesto = FontFactory.GetFont("Arial", 10);
            Font fontTestoBold = FontFactory.GetFont("Arial", 10, Font.BOLD);
            //
            Paragraph paragrafo = new Paragraph();
            Phrase frase = new Phrase();
            //
            iTextSharp.text.Image logo =
                iTextSharp.text.Image.GetInstance(
                    Server.MapPath("img/raspberry.png"));
            //
            writer = PdfWriter.GetInstance(doc, str);
            //
            doc.Open();
            //inserisco logo
            logo.Alignment = iTextSharp.text.Image.ALIGN_LEFT;
            logo.ScaleToFit(100f, 100f);
            doc.Add(logo);
            doc.Add(Chunk.NEWLINE);  //a capo
            doc.Add(Chunk.NEWLINE);
            //
            paragrafo = new Paragraph("Fattura n." + idFattura+" Data "+DateTime.Now.ToShortDateString(), fontTitolo);
            paragrafo.Alignment = iTextSharp.text.Element.ALIGN_CENTER;
            doc.Add(paragrafo);
            doc.Add(Chunk.NEWLINE);  //a capo
            string cliente = db.cercaCliente(Session["idUtente"].ToString());
            paragrafo = new Paragraph("Cliente " + cliente, fontTesto);
            paragrafo.Alignment = iTextSharp.text.Element.ALIGN_LEFT;
            doc.Add(paragrafo);
            doc.Add(Chunk.NEWLINE);  //a capo
            //tabella
            PdfPTable tabella = new PdfPTable(2);
            tabella.DefaultCell.FixedHeight = 200f;
            tabella.HorizontalAlignment = iTextSharp.text.Element.ALIGN_CENTER;
            tabella.SpacingBefore = 5;
            tabella.SpacingAfter = 5;
            tabella.DefaultCell.Border = 1;
            float[] larghezzaColonne = new float[] { 40, 30 };
            tabella.SetWidths(larghezzaColonne);
            //prima riga
            PdfPCell cella;
            cella = new PdfPCell(new Phrase("Articolo", fontTestoBold));
            cella.HorizontalAlignment = Element.ALIGN_CENTER;
            tabella.AddCell(cella);
            cella = new PdfPCell(new Phrase("Quantità", fontTestoBold));
            cella.HorizontalAlignment = Element.ALIGN_CENTER;
            tabella.AddCell(cella);
            //
            //righe prodotti
            for (int i = 0; i < carrello.Count; i++)
            {
                string[] v = carrello[i].Split(';');
                string descrizione = db.cercaDescrizione(v[0]);
                cella = new PdfPCell(new Phrase(descrizione, fontTesto));
                cella.HorizontalAlignment = Element.ALIGN_LEFT;
                tabella.AddCell(cella);
                cella = new PdfPCell(new Phrase(v[1], fontTesto));
                cella.HorizontalAlignment = Element.ALIGN_CENTER;
                tabella.AddCell(cella);
            }
            doc.Add(tabella);
            //
            doc.Add(Chunk.NEWLINE);  //a capo
            doc.Add(Chunk.NEWLINE);  //a capo
            string totale = db.totale(idFattura);
            paragrafo = new Paragraph("Totale" + totale + " Euro ", fontTestoBold);
            paragrafo.Alignment = iTextSharp.text.Element.ALIGN_LEFT;
            doc.Add(paragrafo);
            doc.Add(Chunk.NEWLINE);  //a capo
            //
            doc.Close();
        }
    }
}