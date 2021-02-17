using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace _04_TriggerAssieme
{
    public partial class Form1 : Form
    {
        public static readonly string workingDirectory = Environment.CurrentDirectory;
        public static readonly string projectDirectory = Directory.GetParent(workingDirectory).Parent.Parent.FullName;
        public static readonly string CONNECTION_STRING = @"Data Source=(LocalDB)\MSSQLLocalDB;AttachDbFilename=" + projectDirectory + @"\Clienti.mdf;Integrated Security=True;Connect Timeout=30";

        private BindingSource bsClienti = new BindingSource();
        private BindingSource bsStoricoCanc = new BindingSource();
        private BindingSource bsStoricoUpd = new BindingSource();
        private SqlDataAdapter daClienti, daStoricoCancellazioni, daStoricoAggiornamenti;
        private DataTable dtClienti, dtStoricoCancellazioni, dtStoricoAggiornamenti;

    

        public Form1()
        {
            InitializeComponent();
            PopulateDgv(0);
        }

        private void label3_Click(object sender, EventArgs e)
        {

        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }

        private void PopulateDgv(int table)
        {
            switch (table)
            {
                case 0:
                    // Clienti
                    dgvClienti.DataSource = bsClienti;
                    Queryable("SELECT * FROM Clienti", out daClienti);

                    if (daClienti != null)
                    {
                        dtClienti = new DataTable();
                        daClienti.Fill(dtClienti);
                        bsClienti.DataSource = dtClienti;
                    }
                    dgvClienti.AutoResizeColumns(DataGridViewAutoSizeColumnsMode.AllCells);

                    //Cancellazioni
                    dgvStoricoCancellazioni.DataSource = bsStoricoCanc;
                    Queryable("SELECT * FROM StoricoCancellazioni", out daStoricoCancellazioni);

                    if (daStoricoCancellazioni != null)
                    {
                        dtStoricoCancellazioni = new DataTable();
                        daStoricoCancellazioni.Fill(dtStoricoCancellazioni);
                        bsStoricoCanc.DataSource = dtStoricoCancellazioni;
                    }
                    dgvStoricoCancellazioni.AutoResizeColumns(DataGridViewAutoSizeColumnsMode.AllCellsExceptHeader);

                    //Aggiornamenti
                    dgvStoricoAggiornamenti.DataSource = bsStoricoUpd;
                    Queryable("SELECT * FROM StoricoAggiornamenti", out daStoricoAggiornamenti);

                    if (daStoricoAggiornamenti != null)
                    {
                        dtStoricoAggiornamenti = new DataTable();
                        daStoricoAggiornamenti.Fill(dtStoricoAggiornamenti);
                        bsStoricoUpd.DataSource = dtStoricoAggiornamenti;
                    }
                    dgvStoricoAggiornamenti.AutoResizeColumns(DataGridViewAutoSizeColumnsMode.AllCellsExceptHeader);

                    break;

                case 1:
                    dgvClienti.DataSource = bsClienti;
                    Queryable("SELECT * FROM Clienti", out daClienti);

                    if (daClienti!= null)
                    {
                        dtClienti = new DataTable();
                        daClienti.Fill(dtClienti);
                        bsClienti.DataSource = dtClienti;
                    }
                    dgvClienti.AutoResizeColumns(DataGridViewAutoSizeColumnsMode.AllCellsExceptHeader);
                    break;

                case 2:
                    dgvStoricoCancellazioni.DataSource = bsStoricoCanc;
                    Queryable("SELECT * FROM StoricoCancellazioni", out daStoricoCancellazioni);

                    if (daStoricoCancellazioni != null)
                    {
                        dtStoricoCancellazioni = new DataTable();
                        daStoricoCancellazioni.Fill(dtStoricoCancellazioni);
                        bsStoricoCanc.DataSource = dtStoricoCancellazioni;
                    }
                    dgvStoricoCancellazioni.AutoResizeColumns(DataGridViewAutoSizeColumnsMode.AllCellsExceptHeader);
                    break;

                case 3:
                    dgvStoricoAggiornamenti.DataSource = bsStoricoUpd;
                    Queryable("SELECT * FROM StoricoAggiornamenti", out daStoricoAggiornamenti);

                    if (daStoricoAggiornamenti != null)
                    {
                        dtStoricoAggiornamenti = new DataTable();
                        daStoricoAggiornamenti.Fill(dtStoricoAggiornamenti);
                        bsStoricoUpd.DataSource = dtStoricoAggiornamenti;
                    }
                    dgvStoricoAggiornamenti.AutoResizeColumns(DataGridViewAutoSizeColumnsMode.AllCellsExceptHeader);
                    break;
            }
        }

        private void Queryable(string selectCommand, out SqlDataAdapter da)
        {
            da = null;
            try
            {
                // Crea un nuovo Data Adapter basato su selectCommand
                da = new SqlDataAdapter(selectCommand, CONNECTION_STRING);
                
                // Creo il command builder per generare update, insert, delete
                SqlCommandBuilder commandBuilder = new SqlCommandBuilder(da);
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        private void btnUpdate_Click(object sender, EventArgs e)
        {
            int index = 0;
            if (dgvClienti.SelectedCells.Count > 0)
            {
                index = dgvClienti.SelectedCells[0].RowIndex; ;
                Queryable("UPDATE Clienti SET IdCliente="+dgvClienti.Rows[index].Cells[0]+
                    "IdCliente=" + dgvClienti.Rows[index].Cells[0] +
                    "Nome=" + dgvClienti.Rows[index].Cells[1] +
                    "Cognome=" + dgvClienti.Rows[index].Cells[2] +
                    "IdCarrello=" + dgvClienti.Rows[index].Cells[3] +
                    "WHERE IdCliente =" + (index + 1).ToString(), out daClienti);

                if (daClienti != null)
                {
                    PopulateDgv(3);
                }

            }
        }

        private void btnElimina_Click(object sender, EventArgs e)
        {
            int index = 0;
            if (dgvClienti.SelectedCells.Count > 0)
            {
                index = dgvClienti.SelectedCells[0].RowIndex; ;
                Queryable("DELETE from Clienti WHERE IdCliente =" + (index + 1).ToString(), out daClienti);
                if(daClienti!=null)
                { 
                    PopulateDgv(2);
                    dgvClienti.Rows.RemoveAt(index);
                }

            }

        }

    }
}
