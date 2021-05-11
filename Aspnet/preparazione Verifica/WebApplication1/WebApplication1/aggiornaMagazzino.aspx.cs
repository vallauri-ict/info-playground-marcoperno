using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ADOSQLServer2017_ns;
using System.Data.SqlClient;
using System.Data;

namespace WebApplication1
{
    public partial class aggiornaMagazzin : System.Web.UI.Page
    {
        clsDB db;
        protected void Page_Load(object sender, EventArgs e)
        {
            db = new clsDB("App_Data\\magazzino.mdf");
        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            string path = "movimenti.csv";
            string nomePDF = Server.MapPath(path);
            StreamReader fp = new StreamReader(nomePDF);
            while (fp.Peek() > -1)
            {
                string s = fp.ReadLine();
                string[] v = s.Split(';');
                int a = Convert.ToInt32(v[0]);
                int b = Convert.ToInt32(v[1]);
                db.aggiornaPrezzoArticolo(Convert.ToInt32(v[0]), Convert.ToInt32(v[1]));


            }
            fp.Close();
        }
    }
}