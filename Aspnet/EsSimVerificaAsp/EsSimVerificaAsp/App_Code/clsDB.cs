﻿using System;
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

namespace EsSimVerificaAsp
{
    public class clsDB
    {
        ADOSQLServer2017 ado;
        public clsDB(string nomeDB)
        {
            this.ado = new ADOSQLServer2017(nomeDB);
        }

        public static string funz (string x)
        {
            return x + "1";
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

        public  DataTable restituisciCorsi()
        {
            DataTable dt;
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "SELECT * ";
            cmd.CommandText += "FROM Corsi ";
            //cmd.CommandText += "WHERE userName=@userName ";
            //cmd.Parameters.AddWithValue("@userName", userName);
            cmd.CommandType = CommandType.Text;
            return dt = ado.EseguiQuery(cmd);
        }

        internal void aggiungiIscrizione(int idNominativo, int idCorso)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "INSERT INTO Iscrizioni ";
            cmd.CommandText += "(IdCorso, IdCliente, DataIscrizione) ";
            cmd.CommandText += "VALUES (@IdCorso, @IdNominativo, convert(date, '17/12/2015', 103)) ";
            cmd.Parameters.AddWithValue("@IdCorso", idCorso);
            cmd.Parameters.AddWithValue("@IdNominativo", idNominativo);
            cmd.CommandType = CommandType.Text;
            ado.EseguiNonQuery(cmd);

        }

        public  int restituisciIdNominativo(string email, string pwd)
        {
            int id = -1;

            DataTable dt;
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "SELECT IdNominativo ";
            cmd.CommandText += "FROM Nominativo ";
            cmd.CommandText += "WHERE email=@email AND pwd=@pwd ";
            cmd.Parameters.AddWithValue("@email", email);
            cmd.Parameters.AddWithValue("@pwd", pwd);
            cmd.CommandType = CommandType.Text;
            dt = ado.EseguiQuery(cmd);
            if(dt.Rows.Count > 0)
                id = Convert.ToInt32( dt.Rows[0].ItemArray[0].ToString());

            return id;
        }

        internal DataTable restituisciIscrittiCorso(int idCorso)
        {
            DataTable dt;
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "SELECT IdCliente ";
            cmd.CommandText += "FROM Iscrizioni ";
            cmd.CommandText += "WHERE IdCorso=@idCorso";
            cmd.Parameters.AddWithValue("@idCorso", idCorso);
            cmd.CommandType = CommandType.Text;
            return dt = ado.EseguiQuery(cmd);
        }
    }
}