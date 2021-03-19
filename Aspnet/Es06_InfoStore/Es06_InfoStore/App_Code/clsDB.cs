using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
//
using ADOSQLServer2017_ns;
using System.Data;
using System.Data.SqlClient;
//
using System.Security.Cryptography;
using System.Text;

namespace Es06_InfoStore
{
    public class clsDB
    {
        ADOSQLServer2017 ado;
        public clsDB(string nomeDB)
        {
            this.ado = new ADOSQLServer2017(nomeDB);
        }

        public string sha256(string pwd)
        {
            string p = "";
            SHA256 mySHA256 = SHA256.Create();
            //calcolo codice hash 
            byte[] hashValue = mySHA256.ComputeHash(Encoding.UTF8.GetBytes(pwd));
            // Convert byte array to a string   
            StringBuilder builder = new StringBuilder();
            for (int i = 0; i < hashValue.Length; i++)
            {
                builder.Append(hashValue[i].ToString("x2")); //converto in esadecimale
            }
            p = builder.ToString();
            return p;
        }

        public DataTable leggiProdotto(string idProdotto)
        {
            DataTable dt;
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "SELECT Prodotti.idProdotto, Marca, prezzo, Nome, Descrizione, Qta FROM Prodotti, TipoProdotto, Conservazione ";
            cmd.CommandText += "WHERE Prodotti.idTipoProdotto=TipoProdotto.idTipoProdotto AND Prodotti.idProdotto=Conservazione.idProdotto AND Prodotti.idProdotto=@idProdotto ";
            cmd.Parameters.AddWithValue("@idProdotto", idProdotto);
            dt = ado.EseguiQuery(cmd);
            return dt;
        }

        public DataTable caricaProdotti()
        {
            DataTable dt;
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "SELECT * FROM TipoProdotto";
            dt = ado.EseguiQuery(cmd);
            return dt;
        }

        public void inserisciProdotto(string s)
        {
            string[] v = s.Split(';');
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "INSERT INTO Prodotti(Marca, Prezzo, Nome, img, idTipoprodotto) ";
            cmd.CommandText += "VALUES (@Marca, @Prezzo, @Nome, @img, @idTipoProdotto); ";
            cmd.Parameters.AddWithValue("@Marca", v[1]);
            cmd.Parameters.AddWithValue("@Prezzo", v[2]);
            cmd.Parameters.AddWithValue("@Nome", v[3]);
            cmd.Parameters.AddWithValue("@img", v[4]);
            cmd.Parameters.AddWithValue("@idTipoProdotto", v[5]);
            ado.EseguiNonQuery(cmd);
        }

        public void modificaProdotto(string s)
        {
            string[] v = s.Split(';');
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "UPDATE Prodotti SET Marca=@Marca, Prezzo=@Prezzo, Nome=@Nome, img=@img, idTipoProdotto=@idTipoProdotto ";
            cmd.CommandText += "WHERE idProdotto=@idProdotto ";
            cmd.Parameters.AddWithValue("@idProdotto", v[0]);
            cmd.Parameters.AddWithValue("@Marca", v[1]);
            cmd.Parameters.AddWithValue("@Prezzo", v[2]);
            cmd.Parameters.AddWithValue("@Nome", v[3]);
            cmd.Parameters.AddWithValue("@img", v[4]);
            cmd.Parameters.AddWithValue("@idTipoProdotto", v[5]);
            ado.EseguiNonQuery(cmd);
        }

        public bool cercaProdotto(string idProdotto)
        {
            bool trovato = false;
            DataTable dt;
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "SELECT idProdotto FROM Prodotti ";
            cmd.CommandText += "WHERE idProdotto=@idProdotto ";
            cmd.Parameters.AddWithValue("@idProdotto", idProdotto);
            dt = ado.EseguiQuery(cmd);
            if (dt.Rows.Count > 0)
                trovato = true;
            return trovato;
        }

        public int quantita(string idProdotto)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "SELECT qta FROM Conservazione ";
            cmd.CommandText += "WHERE idProdotto=@idProdotto ";
            //N.B. dovrei andare a fare la SUM(qta) perchè ho più magazzini
            cmd.Parameters.AddWithValue("@idProdotto", idProdotto);
            return Convert.ToInt32(ado.EseguiScalar(cmd));
        }

        public DataTable leggiArticoli(string idTipoProdotto)
        {
            DataTable dt;
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "SELECT Prodotti.idProdotto, Marca, prezzo, Nome, Descrizione, Img FROM Prodotti, TipoProdotto ";
            cmd.CommandText += "WHERE Prodotti.idTipoProdotto=TipoProdotto.idTipoProdotto ";
            if (idTipoProdotto!="-1")
            {
                cmd.CommandText += "AND Prodotti.idTipoProdotto=@idTipoProdotto ";
                cmd.Parameters.AddWithValue("@idTipoProdotto", idTipoProdotto);
            }
            dt = ado.EseguiQuery(cmd);
            return dt;
        }

        public void modificaQta(string idProdotto, string qta, char segno)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "UPDATE Conservazione ";
            cmd.CommandText += "SET qta=qta"+segno+"@qta ";
            cmd.CommandText += "WHERE idProdotto=@idProdotto ";
            //N.B. dovrei andare a gestire i magazzini
            cmd.Parameters.AddWithValue("@idProdotto", idProdotto);
            cmd.Parameters.AddWithValue("@qta", qta);
            ado.EseguiNonQuery(cmd);
        }

        public DataTable cercaUtente(string email, string pwd)
        {
            DataTable dt;
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "SELECT idUtente, idAutorizzazione FROM Utenti ";
            cmd.CommandText += "WHERE email=@email AND pwd=@pwd ";
            cmd.Parameters.AddWithValue("@email", email);
            cmd.Parameters.AddWithValue("@pwd", pwd);
            dt = ado.EseguiQuery(cmd);
            return dt;
        }

        public string creaCarrello(string metodoPagamento, bool Concluso, string idFattura, string idCliente)
        {
            string idCarrello = "";
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "INSERT INTO Carrello(MetodoPagamento, Concluso, idFattura, idCliente) ";
            cmd.CommandText += "VALUES (@MetodoPagamento, @Concluso, @idFattura, @idCliente); ";
            cmd.CommandText += "; SELECT SCOPE_IDENTITY();";
            cmd.Parameters.AddWithValue("@MetodoPagamento", metodoPagamento);
            cmd.Parameters.AddWithValue("@Concluso", Concluso);
            cmd.Parameters.AddWithValue("@idFattura", idFattura);
            cmd.Parameters.AddWithValue("@idCliente", idCliente);
            idCarrello = ado.EseguiScalar(cmd).ToString();
            return idCarrello;
        }

        public void InserisciCarrello(string idProdotto, string idCarrello, string qta)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "INSERT INTO DescrizioneCarrello(idProdotto, idCarrello, qta) ";
            cmd.CommandText += "VALUES (@idProdotto, @idCarrello, @qta); ";
            cmd.CommandText += "; SELECT SCOPE_IDENTITY();";
            cmd.Parameters.AddWithValue("@idprodotto", idProdotto);
            cmd.Parameters.AddWithValue("@idCarrello", idCarrello);
            cmd.Parameters.AddWithValue("@qta", qta);
            ado.EseguiNonQuery(cmd);
        }

        public string creaFattura(string prezzoTot, bool pagato)
        {
            string idFattura = "";
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "INSERT INTO Fatture(PrezzoTot, Pagato) ";
            cmd.CommandText += "VALUES (@PrezzoTot, @Pagato); ";
            cmd.CommandText += "; SELECT SCOPE_IDENTITY();";
            cmd.Parameters.AddWithValue("@PrezzoTot", prezzoTot);
            cmd.Parameters.AddWithValue("@Pagato", pagato);
            idFattura= ado.EseguiScalar(cmd).ToString();
            return idFattura;
        }

        public void InserisciUtente(string cognome, string nome, string dataNascita, string citta, string telefono, string email, string pwd, string iban, int idAutorizzazione)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "INSERT INTO Utenti(cognome, nome, dataNascita, citta, telefono, email, pwd, iban, idAutorizzazione) ";
            cmd.CommandText += "VALUES (@cognome, @nome, @dataNascita, @citta, @telefono, @email, @pwd, @iban, @idAutorizzazione) ";
            cmd.Parameters.AddWithValue("@cognome", cognome);
            cmd.Parameters.AddWithValue("@nome", nome);
            cmd.Parameters.AddWithValue("@dataNascita", dataNascita);
            cmd.Parameters.AddWithValue("@citta", citta);
            cmd.Parameters.AddWithValue("@telefono", telefono);
            cmd.Parameters.AddWithValue("@email", email);
            cmd.Parameters.AddWithValue("@pwd", pwd);
            cmd.Parameters.AddWithValue("@iban", iban);
            cmd.Parameters.AddWithValue("@idAutorizzazione", idAutorizzazione);
            ado.EseguiNonQuery(cmd);
        }

        public string cercaCliente(string idUtente)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = @"SELECT Cognome + ' ' + Nome
                            FROM Utenti
                            WHERE idUtente = @idUtente";
            cmd.Parameters.AddWithValue("@idUtente", idUtente);
            return ado.EseguiScalar(cmd).ToString();
        }

        public int EmailPwdPresenti(string email)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = @"SELECT COUNT(*)
                            FROM Utenti
                            WHERE email = @email";
            cmd.Parameters.AddWithValue("@email", email);
            return Convert.ToInt32(ado.EseguiScalar(cmd));
        }

        public string cercaDescrizione(string idProdotto)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = @"SELECT Nome
                            FROM Prodotti
                            WHERE idProdotto = @idProdotto";
            cmd.Parameters.AddWithValue("@idProdotto", idProdotto);
            return ado.EseguiScalar(cmd).ToString();
        }

        public string totale(string idFattura)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = @"SELECT PrezzoTot
                            FROM Fatture
                            WHERE idFattura = @idFattura";
            cmd.Parameters.AddWithValue("@idFattura", idFattura);
            return ado.EseguiScalar(cmd).ToString();
        }
    }
}