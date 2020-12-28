using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net;
using System.Net.Sockets;
using System.Windows.Forms;

namespace Socket02_SRV
{
    public partial class Form1 : Form
    {
        private clsSocket serverSocket;
        string[] vFiles = new string[99];
        private string pathFiles;

        public delegate void aggiornaGraficaEventHandler(clsMessaggio msg)  ;
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            clsAddress.cercaIP();
            lstIPServer.DataSource = clsAddress.ipVett;

            lblStatoServer.Text = "STOPPED";

            gestioneBottoniServer(true);

            pathFiles = Application.StartupPath + "\\FTPFiles\\";
        }

        private void gestioneBottoniServer(bool abilita)
        {
            btnAvvia.Enabled = abilita;
            btnArresta.Enabled = !abilita;
        }

        private void btnAvvia_Click(object sender, EventArgs e)
        {
            IPAddress ip;
            try
            {
                if(serverSocket == null)
                {
                    ip = clsAddress.ipVett[lstIPServer.SelectedIndex];

                    serverSocket = new clsSocket(true, Convert.ToInt32(cmbPortaServer.Text), ip);

                    serverSocket.datiRicevutiEvent += new datiRicevutiEventHandler(datiRicevuti);
                }

                serverSocket.avviaServer();

                gestioneBottoniServer(false);

                lblStatoServer.Text = "RUNNING...";
            }
            catch (Exception ex)
            {
                MessageBox.Show("Errore: " + ex.Message);
            }
        }

        private void datiRicevuti(clsMessaggio Msg)
        {
            string tipoRQ;
            string[] vetDati;
            System.IO.StreamWriter fileTXT;

            tipoRQ = Msg.messaggio.Substring(0, 6);
            if(tipoRQ == "*TEST*")
            {
                Msg.esito = "*OK*";
            }
            else if (tipoRQ == "*SEND*")
            {
                vetDati = Msg.messaggio.Split('@');
                Msg.file = vetDati[1];

                if(!chkFile(vetDati[1]))
                {
                    fileTXT = new System.IO.StreamWriter(pathFiles + vetDati[1]);
                    fileTXT.Close();
                    Msg.esito = "*RSP*@File creato";
                }
                else
                {
                    fileTXT = new System.IO.StreamWriter(pathFiles + vetDati[1], true);
                    fileTXT.WriteLine(vetDati[2]);
                    fileTXT.Close();
                    Msg.esito = "*RSP*@File aggiornato";
                }
            }
            else if (tipoRQ == "*_END*")
            {
                vetDati = Msg.messaggio.Split('@');
                Msg.file = vetDati[1];

                removeFile(vetDati[1]);

                Msg.esito = "*RSP*@Fine file";
            }
            else
            {
                Msg.esito = "*ERR_TX_RQ*";
            }

            serverSocket.inviaMsgSERVER(Msg.esito);
            aggiornaGraficaEventHandler pt = new aggiornaGraficaEventHandler(aggiornaGrafica);

            
        }

        private void aggiornaGrafica(clsMessaggio msg)
        {
            lstLogServer.Items.Add(msg.ToString());
        }

        private void removeFile(string nomeFile)
        {
            for (int i = 0; i < vFiles.Length; i++)
            {
                if (vFiles[i] == nomeFile)
                {
                    vFiles[i] = null;
                    break;
                }
            }
        }

        private bool chkFile(string nomeFile)
        {

            for (int i = 0; i < vFiles.Length; i++)
            {
                if (vFiles[i] == nomeFile)
                {
                    return true;
                }
            }

            for (int i = 0;i<vFiles.Length;i++)
            {
                if(vFiles[i]==null)
                {
                    vFiles[i] = nomeFile;
                    break;
                }
            }

            return false;
        }

        private void Form1_FormClosing(object sender, FormClosingEventArgs e)
        {
            if(serverSocket!=null)
            {
                serverSocket.Dispose();
            }
        }

        private void btnArresta_Click(object sender, EventArgs e)
        {
            serverSocket.arrestaServer();

            gestioneBottoniServer(true);

            lblStatoServer.Text = "STOPPED...";
        }
    }
}
