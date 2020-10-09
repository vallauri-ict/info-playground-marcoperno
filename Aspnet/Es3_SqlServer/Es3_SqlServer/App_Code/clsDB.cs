using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using ADOSQLServer2017_ns;
using System.Data;
using System.Data.SqlClient;


public class clsDB
{
    ADOSQLServer2017 ado;
    public clsDB(string nomeDB)
    {
        this.ado = new ADOSQLServer2017(nomeDB);
    }

    internal object caricaRegioni()
    {
        SqlCommand cmd = new SqlCommand();
        cmd.CommandText = "SELECT * ";
        cmd.CommandText += "FROM Regioni ";
        cmd.CommandText += "ORDER BY Regione ASC";
        cmd.CommandType = CommandType.Text;
        return ado.EseguiQuery(cmd);
    }

    internal object popolaCmbProvince(int i)
    {
        SqlCommand cmd = new SqlCommand();
        cmd.CommandText = "SELECT * ";
        cmd.CommandText += "FROM Province ";
        cmd.CommandText += "WHERE idRegione = "+i.ToString()+" ";
        cmd.CommandText += "ORDER BY Provincia ASC";
        cmd.CommandType = CommandType.Text;
        return ado.EseguiQuery(cmd);
    }

    internal object popolaCmbComuni(int i)
    {
        SqlCommand cmd = new SqlCommand();
        cmd.CommandText = "SELECT * ";
        cmd.CommandText += "FROM Comuni ";
        cmd.CommandText += "WHERE idProvincia = " + i.ToString() + " ";
        cmd.CommandText += "ORDER BY Comune ASC";
        cmd.CommandType = CommandType.Text;
        return ado.EseguiQuery(cmd);
    }
}