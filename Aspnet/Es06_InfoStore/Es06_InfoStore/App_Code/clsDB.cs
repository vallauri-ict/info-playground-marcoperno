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

        public DataTable cercaUtente(string text, string v)
        {
            throw new NotImplementedException();
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

        public int EmailPwdPresenti(string email)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = @"SELECT COUNT(*)
                            FROM Utenti
                            WHERE email = @email";
            cmd.Parameters.AddWithValue("@email", email);
            return Convert.ToInt32(ado.EseguiScalar(cmd));
        }
    }
}