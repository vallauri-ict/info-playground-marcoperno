using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;


using System.Net;
using System.Net.Sockets;

namespace Socket_01
{
    public partial class Es01_Socket : Form
    {
        clsSocket socketServer;
        clsSocket socketClient;
        clsMessaggio MsgFromServer;
        public delegate void aggiornaGraficaEventHandler(clsMessaggio Msg);
        public Es01_Socket()
        {
            InitializeComponent();
        }

        //procedura iniziale

        private void Es01_Socket_Load(object sender, EventArgs e)
        {
            clsAddress.cercaIP();
            LstIP.DataSource = clsAddress.ipVett;
            
        }

        private void LstIP_SelectedIndexChanged(object sender, EventArgs e)
        {
            chkIPPorta();
        }

        private void CmbPortaServer_SelectedIndexChanged(object sender, EventArgs e)
        {
            chkIPPorta();
        }
        
        private bool chkIPPorta()
        {
            if (LstIP.SelectedIndex != -1 && cmbPortaServer.SelectedIndex != -1)
            {
                btnAvviaServer.Enabled = true;
                LstIP.Enabled = false;
                cmbPortaServer.Enabled = false;
                return true;
            }
            else
            {
                btnAvviaServer.Enabled = false;
                btnArrestaServer.Enabled = false;
                return false;
            }
        }

        private void BtnAvviaServer_Click(object sender, EventArgs e)
        {
            IPAddress iP = IPAddress.Parse((LstIP.SelectedItem.ToString()));
            
            if(socketServer == null)
            {
                socketServer = new clsSocket(true, Convert.ToInt32(cmbPortaServer.Text), iP);
                socketServer.avviaServer();
                socketServer.datiRicevutiEvent += new datiRicevutiEventHandler(DatiRicevuti);
                btnArrestaServer.Enabled = true;
                btnAvviaServer.Enabled = false;
                btnInvia.Enabled = true;
                lblStatoServer.Text = "RUNNING";
            }
            
        }

        private void DatiRicevuti(clsMessaggio inMsg)
        {
            
            socketServer.inviaMsg("ACK");
            aggiornaGraficaEventHandler pt = new aggiornaGraficaEventHandler(aggiornaGrafica);
            this.Invoke(pt, inMsg);
            
        }

        private void aggiornaGrafica(clsMessaggio Msg)
        {
            if(Msg.messaggio!="ACK")
                txtMessaggioRicevuto.Text = Msg.ToString();
            else
            {
                txtMessaggioDaInviare.Text = "ACK";
            }
        }

        private void BtnArrestaServer_Click(object sender, EventArgs e)
        {
            socketServer.arrestaServer();
            socketServer.Dispose();
            btnArrestaServer.Enabled = false;
            btnAvviaServer.Enabled = true;
            socketServer = null;
            btnInvia.Enabled = false;
            lblStatoServer.Text = "STOP";
            LstIP.Enabled = true;
            cmbPortaServer.Enabled = true;
        }

        private void BtnInvia_Click(object sender, EventArgs e)
        {
            IPAddress iP = IPAddress.Parse((txtIPHostRemoto.Text.ToString()));
            socketClient = new clsSocket(false, Convert.ToInt32(cmbPortaHostRemoto.Text), iP);
            socketClient.inviaMsg(txtMessaggioDaInviare.Text);
            socketClient.datiRicevutiEvent += DatiRicevuti2;
            socketClient.clientRicevi();

        }

        private void DatiRicevuti2(clsMessaggio Msg)
        {
            aggiornaGraficaEventHandler pt = new aggiornaGraficaEventHandler(aggiornaGrafica);
            this.Invoke(pt, Msg);
        }
    }
}
