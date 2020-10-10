﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
//using Es3_SqlServer.App_Code;

namespace Es3_SqlServer
{
    public partial class _default : System.Web.UI.Page
    {
        clsDB db;
        protected void Page_Load(object sender, EventArgs e)
        {
            db = new clsDB("App_Data\\DBItalia.mdf");
            if (!Page.IsPostBack)
            {
                popolaCmbRegioni();
            }
           
        }

        private void popolaCmbComuni(int index = -1)
        {
            if (Convert.ToInt32(cmbProvince.SelectedValue) != -1)
            {
                cmbComuni.Items.Clear();
                cmbComuni.DataSource = db.popolaCmbComuni(Convert.ToInt32(cmbProvince.SelectedValue));
                cmbComuni.DataValueField = "idComune";
                cmbComuni.DataTextField = "Comune";
                cmbComuni.DataBind();
            }
        }

        private void popolaCmbProvince(int index=-1)
        {
            if (Convert.ToInt32(cmbRegioni.SelectedValue) != -1)
            {
                cmbProvince.Items.Clear();
                cmbProvince.DataSource = db.popolaCmbProvince(Convert.ToInt32(cmbRegioni.SelectedValue));
                cmbProvince.DataValueField = "idProvincia";
                cmbProvince.DataTextField = "Provincia";
                cmbProvince.DataBind();
                popolaCmbComuni(Convert.ToInt32(cmbProvince.Items[0].Value));
            }
        }

        private void popolaCmbRegioni()
        {
            cmbRegioni.DataSource = db.caricaRegioni();
            cmbRegioni.DataValueField = "idRegione";
            cmbRegioni.DataTextField = "Regione";
            cmbRegioni.DataBind();
            popolaCmbProvince(Convert.ToInt32(cmbRegioni.Items[0].Value));

        }

        protected void cmbRegioni_SelectedIndexChanged(object sender, EventArgs e)
        {
            popolaCmbProvince();
        }

        protected void cmbProvince_SelectedIndexChanged(object sender, EventArgs e)
        {
            popolaCmbComuni();
            
        }
    }
}