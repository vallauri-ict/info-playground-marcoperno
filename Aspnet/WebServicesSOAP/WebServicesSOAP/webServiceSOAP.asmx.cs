using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
//aggiunto
using System.Data;
using ADOSQLServer2017_ns;
using System.Data.SqlClient;

namespace WebServicesSOAP
{
    /// <summary>
    /// Descrizione di riepilogo per webServiceSOAP
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Per consentire la chiamata di questo servizio Web dallo script utilizzando ASP.NET AJAX, rimuovere il commento dalla riga seguente. 
    // [System.Web.Script.Services.ScriptService]
    public class webServiceSOAP : System.Web.Services.WebService
    {

        ADOSQLServer2017 ado;
        string db = "App_Data\\Scuola.mdf";
        [WebMethod]
        public DataTable classi()
        {
            ado = new ADOSQLServer2017(db);
            DataTable dt;
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = SQLClasse(); //richimo metodo privato
            dt = ado.EseguiQuery(cmd);
            dt.TableName = "dtClassi"; //serve per la serializzazione del datatable
            return dt;
        }
        [WebMethod]
        public DataTable alunni(string IDClasse)
        {
            ado = new ADOSQLServer2017(db);
            DataTable dt;
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "SELECT IDAlunno,Nome,Cognome FROM Alunni WHERE IDClasse = @IDClasse ";
            cmd.Parameters.AddWithValue("@IDClasse", IDClasse);
            dt = ado.EseguiQuery(cmd);
            dt.TableName = "dtAlunni"; //serve per la serializzazione del datatable
            return dt;
        }
        [WebMethod]
        public string inserisciAlunno(string Nome, string Cognome, string IDClasse)
        {
            string IDAlunno = "";
            ado = new ADOSQLServer2017(db);
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "INSERT INTO Alunni (Nome, Cognome, IDClasse) VALUES (@Nome, @Cognome, @IDClasse); ";
            cmd.CommandText += "SELECT SCOPE_IDENTITY() ";
            cmd.Parameters.AddWithValue("@Nome", Nome);
            cmd.Parameters.AddWithValue("@Cognome", Cognome);
            cmd.Parameters.AddWithValue("@IDClasse", IDClasse);
            IDAlunno = ado.EseguiScalar(cmd).ToString();
            return IDAlunno;
        }
        [WebMethod]
        public string inserisciClasse(string Classe)
        {
            string IDClasse = "";
            ado = new ADOSQLServer2017(db);
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "INSERT INTO Classi (Classe) " +
                "VALUES (@Classe); ";
            cmd.CommandText += "SELECT SCOPE_IDENTITY() ";
            cmd.Parameters.AddWithValue("@Classe", Classe);
            IDClasse = ado.EseguiScalar(cmd).ToString();
            return IDClasse;
        }
        [WebMethod]
        public bool modificaClasse(string IDClasse, string Classe)
        {
            bool esito = false;
            ado = new ADOSQLServer2017(db);
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "UPDATE Classi SET Classe=@Classe WHERE IDClasse=@IDClasse ";
            cmd.Parameters.AddWithValue("@IDClasse", IDClasse);
            cmd.Parameters.AddWithValue("@Classe", Classe);
            if (ado.EseguiNonQuery(cmd) > 0)
                esito = true;
            return esito;
        }
        [WebMethod]
        public bool eliminaClasse(string IDClasse)
        {
            bool esito = false;
            ado = new ADOSQLServer2017(db);
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "DELETE FROM Classi WHERE IDClasse=@IDClasse ";
            cmd.CommandText += "AND IDClasse NOT IN (SELECT DISTINCT IDClasse FROM Alunni) ";
            cmd.Parameters.AddWithValue("@IDClasse", IDClasse);
            if (ado.EseguiNonQuery(cmd) > 0)
                esito = true;
            return esito;
        }
        //questo è un metodo NON un WebMethod
        private string SQLClasse()
        {
            string sql;
            sql = "SELECT IDClasse,Classe ";
            sql += "FROM Classi ";
            sql += "ORDER BY Classe";
            return sql;
        }
    }
}
