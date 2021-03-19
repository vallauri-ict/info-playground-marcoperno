using iTextSharp.text.pdf;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Es06_InfoStore
{
    public partial class confermaOrdine : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["idUtente"] != null && Session["idFattura"] != null)
            {

            }
            else
                Response.Redirect("index.aspx");
        }

        protected void btnvisPDF_Click(object sender, EventArgs e)
        {
            string nomePDF = Server.MapPath(
                "Fatture/fatt_" + Session["idFattura"].ToString() + ".pdf");
            PdfReader reader = new PdfReader(nomePDF);
            MemoryStream str = new MemoryStream();
            PdfStamper stamper = new PdfStamper(reader, str);
            stamper.Close();
            //uso oggetto response per visualizzare il pdf
            Response.Clear();
            Response.ClearContent();
            Response.ClearHeaders();
            Response.ContentType = "application/pdf";
            //posso forzare il download
            Response.AppendHeader("Content-Disposition", 
                "attachment;filename=" + nomePDF);
            //oppure lo apro inline
            //Response.AppendHeader("Content-Disposition", "inline;filename=" + Server.MapPath("pdf/ordine" + codOrdine + ".pdf"));
            //solo per chrome
            //Response.AddHeader("Content-Length", str.Length.ToString());
            Response.BinaryWrite(str.ToArray());
            Response.Flush();
            Response.End();
        }
    }
}