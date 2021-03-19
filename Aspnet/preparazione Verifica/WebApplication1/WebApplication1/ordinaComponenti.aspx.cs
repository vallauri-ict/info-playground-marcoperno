using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ADOSQLServer2017_ns;
using System.Data.SqlClient;
using System.Data;

namespace WebApplication1
{
    public partial class ordinaComponenti : System.Web.UI.Page
    {
        clsDB db;
        protected void Page_Load(object sender, EventArgs e)
        {
            db = new clsDB("App_Data\\magazzino.mdf");

            if (!Page.IsPostBack)
            {

            }
        }

        
    }
}