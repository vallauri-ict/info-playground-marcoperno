using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
//
using ADOSQLServer2017_ns;
using System.Data;
using System.Data.SqlClient;
using System.Security.Cryptography;
using System.Text;

public class clsDB
    {
        ADOSQLServer2017 ado;
    //    
    //property Utente
    //
    private string cognome;
    public string Cognome 
    { 
        get 
        { return cognome; }
        set 
        {
            if (value.Length < 3)
                throw new Exception("Cognome non valido");
            else
                cognome = value; 
        } 
    }
    private string nome;

    public string Nome
    {
        get
        { return nome; }
        set
        {
            if (value.Length < 3)
                throw new Exception("Nome non valido");
            else
                nome = value;
        }
    }

    private string username;
    public string Username
    {
        get
        { return username; }
        set
        {
            if (value.Length < 6)
                throw new Exception("Username non valido");
            else
                username = value;
        }
    }

    private string pwd;
    public string Pwd
    {
        get
        { return pwd; }
        set
        {
            if (value.Length < 6)
                throw new Exception("Password non valido");
            else
                pwd = this.sha256(value);
        }
    }
    private string dataNascita;
    public string DataNascita
    {
        get
        { return dataNascita; }
        set
        {
            try
            {
                DateTime d = Convert.ToDateTime(value);
                dataNascita = value;
            }
            catch (Exception)
            {
                throw new Exception("Data Nascita non valida");
            }
        }
    }

    private string idRegione;
    public string IdRegione
    {
        get
        { return idRegione; }
        set
        {
            if (value=="-1")
                throw new Exception("Regione non valida");
            else
                idRegione = value;
        }
    }
    private string idProvincia;
    public string IdProvincia
    {
        get
        { return idProvincia; }
        set
        {
            if (value == "-1")
                throw new Exception("Provincia non valida");
            else
                idProvincia = value;
        }
    }
    private string idComune;
    public string IdComune
    {
        get
        { return idComune; }
        set
        {
            if (value == "-1")
                throw new Exception("Comune non valido");
            else
                idComune = value;
        }
    }
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
    public DataTable caricaRegioni()
    {
        SqlCommand cmd = new SqlCommand();
        cmd.CommandText = "SELECT * ";
        cmd.CommandText += "FROM Regioni ";
        cmd.CommandText += "ORDER BY Regione ";
        cmd.CommandType = CommandType.Text;
        return ado.EseguiQuery(cmd);
    }

    public DataTable caricaProvince(string idRegione)
    {
        SqlCommand cmd = new SqlCommand();
        cmd.CommandText = "SELECT * ";
        cmd.CommandText += "FROM Province ";
        cmd.CommandText += "WHERE idRegione=@idRegione ";
        cmd.CommandText += "ORDER BY Provincia ";
        cmd.Parameters.AddWithValue("@idRegione", idRegione);
        cmd.CommandType = CommandType.Text;
        return ado.EseguiQuery(cmd);
    }

    public DataTable caricaComuni(string idProvincia)
    {
        SqlCommand cmd = new SqlCommand();
        cmd.CommandText = "SELECT * ";
        cmd.CommandText += "FROM Comuni ";
        cmd.CommandText += "WHERE idProvincia=@idProvincia ";
        cmd.CommandText += "ORDER BY Comune ";
        cmd.Parameters.AddWithValue("@idProvincia", idProvincia);
        cmd.CommandType = CommandType.Text;
        return ado.EseguiQuery(cmd);
    }

    public string inserisciUtente()
    {
        SqlCommand cmd = new SqlCommand();
        cmd.CommandText = "INSERT INTO Utenti ";
        cmd.CommandText += "(cognome, nome, username, pwd, dataNascita, regioneNascita, provinciaNascita, comuneNascita) "; 
        cmd.CommandText += "VALUES (@cognome, @nome, @username, @pwd, @dataNascita, @regioneNascita, @provinciaNascita, @comuneNascita); ";
        //per ritornare la chiave primaria del record inserito
        cmd.CommandText += "SELECT SCOPE_IDENTITY() ";
        cmd.Parameters.AddWithValue("@cognome", cognome);
        cmd.Parameters.AddWithValue("@nome", nome);
        cmd.Parameters.AddWithValue("@userName", username);
        cmd.Parameters.AddWithValue("@pwd", pwd);
        cmd.Parameters.AddWithValue("@dataNascita", dataNascita);
        cmd.Parameters.AddWithValue("@regioneNascita", idRegione);
        cmd.Parameters.AddWithValue("@provinciaNascita", idProvincia);
        cmd.Parameters.AddWithValue("@comuneNascita", IdComune);
        cmd.CommandType = CommandType.Text;
        return ado.EseguiScalar(cmd).ToString();
    }

    public bool controllaUsername(string userName)
    {
        bool esito = false;
        DataTable dt;
        SqlCommand cmd = new SqlCommand();
        cmd.CommandText = "SELECT * ";
        cmd.CommandText += "FROM Utenti ";
        cmd.CommandText += "WHERE userName=@userName ";
        cmd.Parameters.AddWithValue("@userName", userName);
        cmd.CommandType = CommandType.Text;
        dt = ado.EseguiQuery(cmd);
        if (dt.Rows.Count > 0)
            esito = true;
        return esito;
    }
    public string login()
    {
        string esito = "-1";
        SqlCommand cmd = new SqlCommand();
        cmd.CommandText = "SELECT idutente ";
        cmd.CommandText += "FROM Utenti ";
        cmd.CommandText += "WHERE userName=@userName AND ";
        cmd.CommandText += "pwd=@pwd ";
        cmd.Parameters.AddWithValue("@userName", username); //property
        cmd.Parameters.AddWithValue("@pwd", pwd); //property
        cmd.CommandType = CommandType.Text;
        try
        {
            esito = ado.EseguiScalar(cmd).ToString();
        }
        catch (Exception)
        {
            //utente non trovato "-1"
        }
        return esito;
    }
    public string login(string un, string password)
    {
        string esito = "-1";
        SqlCommand cmd = new SqlCommand();
        cmd.CommandText = "SELECT idutente ";
        cmd.CommandText += "FROM Utenti ";
        cmd.CommandText += "WHERE userName=@userName AND ";
        cmd.CommandText += "pwd=@pwd ";
        cmd.Parameters.AddWithValue("@userName", un); 
        cmd.Parameters.AddWithValue("@pwd", password); 
        cmd.CommandType = CommandType.Text;
        try
        {
            esito = ado.EseguiScalar(cmd).ToString();
        }
        catch (Exception)
        {
            //utente non trovato "-1"
        }
        return esito;
    }
    public DataTable caricaUtente(string idUtente)
    {
        DataTable dt;
        SqlCommand cmd = new SqlCommand();
        cmd.CommandText = "SELECT * ";
        cmd.CommandText += "FROM Utenti ";
        cmd.CommandText += "WHERE idUtente=@idUtente ";
        cmd.Parameters.AddWithValue("@idUtente", idUtente);
        cmd.CommandType = CommandType.Text;
        dt= ado.EseguiQuery(cmd);
        //potrebbe accadere che non esista l'utente, quindi per sicurezza dovrei testare che .count>0
        cognome = dt.Rows[0].ItemArray[1].ToString();
        nome = dt.Rows[0].ItemArray[2].ToString();
        username = dt.Rows[0].ItemArray[3].ToString();
        pwd = dt.Rows[0].ItemArray[4].ToString();
        dataNascita = dt.Rows[0].ItemArray[5].ToString();
        idRegione = dt.Rows[0].ItemArray[6].ToString();
        idProvincia = dt.Rows[0].ItemArray[7].ToString();
        idComune = dt.Rows[0].ItemArray[8].ToString();
        return dt;
    }

    public DataTable caricaLibri()
    {
        DataTable dt;
        SqlCommand cmd = new SqlCommand();
        cmd.CommandText = "SELECT *, anno ";
        cmd.CommandText += "FROM Libri ";
        cmd.CommandText += "WHERE disponibile = 1 ";
        cmd.CommandType = CommandType.Text;
        dt = ado.EseguiQuery(cmd);
        return dt;
    }

    public void prenotaLibro(string idLibro, string idUtente)
    {
        SqlCommand cmd = new SqlCommand();
        cmd.CommandText = "UPDATE Libri ";
        cmd.CommandText += "SET disponibile=0 ";
        cmd.CommandText += "WHERE idLibro = @idLibro ";
        cmd.Parameters.AddWithValue("@idLibro", idLibro);
        cmd.CommandType = CommandType.Text;
        ado.EseguiNonQuery(cmd);
        //
        cmd = new SqlCommand();
        cmd.CommandText = "INSERT INTO Movimenti ";
        cmd.CommandText += "(idUtente, idLibro, operazione) ";
        cmd.CommandText += "VALUES (@idUtente, @idLibro, @operazione) ";
        cmd.Parameters.AddWithValue("@idUtente", idUtente);
        cmd.Parameters.AddWithValue("@idLibro", idLibro);
        cmd.Parameters.AddWithValue("@operazione", 'P');
        cmd.CommandType = CommandType.Text;
        ado.EseguiNonQuery(cmd);
    }

}