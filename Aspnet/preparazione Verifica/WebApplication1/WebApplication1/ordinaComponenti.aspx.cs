using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ADOSQLServer2017_ns;
using System.Data.SqlClient;
using System.Data;
using System.Net.Mail;
using iTextSharp.text;
using iTextSharp.text.pdf;
using System.IO;

namespace WebApplication1
{
    public partial class ordinaComponenti : System.Web.UI.Page
    {
        int cont = 3;
        clsDB db;
        protected void Page_Load(object sender, EventArgs e)
        {
            db = new clsDB("App_Data\\magazzino.mdf");

            if (!Page.IsPostBack)
            {

            }
        }

        protected void btnMail_Click(object sender, EventArgs e)
        {
            DataTable dt = db.restituisciMateriePrimeMancanti();
            string pathPdf = creaPdf(dt);
            try
            {
                MailMessage m = new MailMessage();
                m.From = new MailAddress("perno59@gmail.com");
                m.To.Add(new MailAddress("ilfornaio392@gmail.com")); //MailAddressCollection(....)
                                                                        //m.CC.Add(new MailAddress(txtCc.Text));
                                                                        //m.Bcc.Add(new MailAddress(txtBcc.Text));
                m.Subject = "Fattura: " ;
                m.Body = "Con la presente inviamo fattura";
                //
                //credenziali
                System.Net.NetworkCredential crd = new System.Net.NetworkCredential();
                crd.UserName = "perno59@gmail.com";
                crd.Password = "Saracube07";
                m.Attachments.Add(new Attachment(Server.MapPath(pathPdf)));
                //
                using (SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587))
            {
                smtp.Credentials = new System.Net.NetworkCredential("perno59@gmail.com", "Saracube07");
                smtp.EnableSsl = true;
                smtp.Send(m);
            }
            }
            catch (Exception ex)
            {
            int i = 0;
                //Session["errore"] = ex.Message;
                //Response.Redirect("pagErrore.aspx");
            }
        }

        private string creaPdf(DataTable dt)
        {
            Document doc = new Document(PageSize.A4, 30, 30, 25, 25);
            PdfWriter writer;
            //MemoryStream str = new MemoryStream();  //serve per invio con response.write
            string path = "Fatture/ fatt_" + cont.ToString() + ".pdf";
            string nomePDF = Server.MapPath(path);
            FileStream str = new FileStream(nomePDF, FileMode.Append);
            //
            Font fontTitolo = FontFactory.GetFont("Arial", 14, Font.BOLD);
            Font fontTesto = FontFactory.GetFont("Arial", 10);
            Font fontTestoBold = FontFactory.GetFont("Arial", 10, Font.BOLD);
            //
            Paragraph paragrafo = new Paragraph();
            //
            writer = PdfWriter.GetInstance(doc, str);
            //
            doc.Open();
            doc.Add(Chunk.NEWLINE);  //a capo
            doc.Add(Chunk.NEWLINE);
            //
            paragrafo = new Paragraph("Fattura n." + cont + " Data " + DateTime.Now.ToShortDateString(), fontTitolo);
            paragrafo.Alignment = iTextSharp.text.Element.ALIGN_CENTER;
            doc.Add(paragrafo);
            doc.Add(Chunk.NEWLINE);  //a capo
            paragrafo = new Paragraph("Cliente " + dt.Rows[0].ItemArray[0].ToString());
            paragrafo.Alignment = iTextSharp.text.Element.ALIGN_LEFT;
            doc.Add(paragrafo);
            doc.Add(Chunk.NEWLINE);  //a capo
            //tabella
            PdfPTable tabella = new PdfPTable(5);
            tabella.DefaultCell.FixedHeight = 200f;
            tabella.HorizontalAlignment = iTextSharp.text.Element.ALIGN_CENTER;
            tabella.SpacingBefore = 5;
            tabella.SpacingAfter = 5;
            tabella.DefaultCell.Border = 1;
            float[] larghezzaColonne = new float[] { 20, 20, 20, 20, 20 };
            tabella.SetWidths(larghezzaColonne);
            //prima riga
            PdfPCell cella;
            cella = new PdfPCell(new Phrase("Email", fontTestoBold));
            cella.HorizontalAlignment = Element.ALIGN_CENTER;
            tabella.AddCell(cella);
            cella = new PdfPCell(new Phrase("IDArticolo", fontTestoBold));
            cella.HorizontalAlignment = Element.ALIGN_CENTER;
            tabella.AddCell(cella);
            cella = new PdfPCell(new Phrase("Giacenza", fontTestoBold));
            cella.HorizontalAlignment = Element.ALIGN_CENTER;
            tabella.AddCell(cella);
            cella = new PdfPCell(new Phrase("ScortaMinima", fontTestoBold));
            cella.HorizontalAlignment = Element.ALIGN_CENTER;
            tabella.AddCell(cella);
            cella = new PdfPCell(new Phrase("PrezzoTot", fontTestoBold));
            cella.HorizontalAlignment = Element.ALIGN_CENTER;
            tabella.AddCell(cella);
            //
            //righe prodotti
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                string email = dt.Rows[i].ItemArray[0].ToString();
                cella = new PdfPCell(new Phrase(email, fontTesto));
                cella.HorizontalAlignment = Element.ALIGN_LEFT;
                tabella.AddCell(cella);
                cella = new PdfPCell(new Phrase(dt.Rows[i].ItemArray[1].ToString(), fontTesto));
                cella.HorizontalAlignment = Element.ALIGN_CENTER;
                tabella.AddCell(cella);
                cella = new PdfPCell(new Phrase(dt.Rows[i].ItemArray[2].ToString(), fontTesto));
                cella.HorizontalAlignment = Element.ALIGN_CENTER;
                tabella.AddCell(cella);
                cella = new PdfPCell(new Phrase(dt.Rows[i].ItemArray[3].ToString(), fontTesto));
                cella.HorizontalAlignment = Element.ALIGN_CENTER;
                tabella.AddCell(cella);
                int prezzoTot = Convert.ToInt32(dt.Rows[i].ItemArray[3]) / Convert.ToInt32(dt.Rows[i].ItemArray[2]) * Convert.ToInt32(dt.Rows[i].ItemArray[4]);
                cella = new PdfPCell(new Phrase(prezzoTot.ToString(), fontTesto));
                cella.HorizontalAlignment = Element.ALIGN_CENTER;
                tabella.AddCell(cella);
            }
            doc.Add(tabella);
            //
            doc.Close();

            cont++;
            return path;
        }
    }
}