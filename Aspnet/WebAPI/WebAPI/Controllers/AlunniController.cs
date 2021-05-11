using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using System.Data;
using ADOSQLServer2017_ns;
using System.Data.SqlClient;
using WebAPI.Models;
namespace WebAPI.Controllers
{
    public class AlunniController : ApiController
    {
        ADOSQLServer2017 ado;
        string db = "..\\App_Data\\Scuola.mdf";
        clsAlunni alunno;
        List<clsAlunni> listAlunni;

        public IEnumerable<clsAlunni> GetAlunni()
        {
            //GET
            //api/alunni
            ado = new ADOSQLServer2017(db);
            DataTable dt;
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "SELECT IDAlunno, Nome, Cognome, IDClasse FROM Alunni ”; dt = ado.EseguiQuery(cmd)";
            listAlunni =  new List<clsAlunni>();
            dt = ado.EseguiQuery(cmd);
            for (int i = 0; i < dt.Rows.Count; i++) {
                alunno = new clsAlunni();
                alunno.IDAlunno = Convert.ToInt32(dt.Rows[i].ItemArray[0]);
                alunno.Nome = dt.Rows[i].ItemArray[1].ToString();
                alunno.Cognome = dt.Rows[i].ItemArray[2].ToString();
                alunno.IDClasse = Convert.ToInt32(dt.Rows[i].ItemArray[3]);
                listAlunni.Add(alunno);
            }
            return listAlunni;
        }

        public IHttpActionResult GetAlunniClasse(int IDAlunno)
        {
            //GET
            //URI api/alunni?IDAlunno=2 IHttpActionResult ris;
            IHttpActionResult ris;
            ado = new ADOSQLServer2017(db);
            DataTable dt;
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "SELECT IDAlunno, Nome, Cognome, IDClasse FROM Alunni WHERE IDAlunno = @IDAlunno ";
            cmd.Parameters.AddWithValue("@IDAlunno", IDAlunno);
            dt = ado.EseguiQuery(cmd);
            alunno = new clsAlunni(); 
            if (dt.Rows.Count > 0)
            {
                alunno.IDAlunno = Convert.ToInt32(dt.Rows[0].ItemArray[0]);
                alunno.Nome = dt.Rows[0].ItemArray[1].ToString(); 
                alunno.Cognome = dt.Rows[0].ItemArray[2].ToString(); 
                alunno.IDClasse = Convert.ToInt32(dt.Rows[0].ItemArray[3]);
                ris = Ok(alunno); //restituisce un oggetto di tipo clsAlunni
            }
                
            else
                ris = NotFound();
            return ris;
        }



    }
}
