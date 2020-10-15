using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

/*  Using specifiche x la CLASSE SOCKET */
using System.Net;
using System.Net.Sockets;
using System.Threading;

namespace Socket02_Cl
{
    // Definisco la firma della Procedura di Evento datiRicevutiEvent
    public delegate void datiRicevutiEventHandler(clsMessaggio Msg);

    class clsSocket
    {

        private bool server;
        public static int maxETH = 1460;
        private Socket socketID;
        private EndPoint binary;
        private Thread threadAscolta;

        // Definisco il Puntatore a Funzione legato all' Evento datiRicevutiEvent
        public event datiRicevutiEventHandler datiRicevutiEvent;

        /***************/
        /* Costruttore */
        /***************/
        public clsSocket(bool inTSocket, int porta, IPAddress ip)
        {

            /*
            * inTSocket = true ==> SEVER
            * inTSocket = fasle ==> CLIENT
            */
            server = inTSocket;

            socketID = new Socket(AddressFamily.InterNetwork, SocketType.Dgram, ProtocolType.Unspecified);
            /*
            * 1° Parametro = indica l'insieme dei Protocolli a cui il Socket fa riferimento (IP V4);
            * 
            * 2° Parametro = indica il Tipo di Protocollo DGram (non Connesso) o Stream (Connesso);
            *
            * 3° Parametro = indica il Singolo protocollo di Connessione (non deve essere specificato per Protocollo DGram)
            */

            binary = new IPEndPoint(ip, porta);
            /*
            * Per il SERVER rappresenta l' endPoint di Ascolto;
            * Per il CLIENT rappresenta l' endPoint del Server al quale si deve collegare;
            */

            /* Nel caso del SERVER lo metto in ascolto sul Binary */
            if (server)
            {
                socketID.Bind(binary);
            }
                

        }

        /***********************************************/
        /* Procedura di Ascolto per ricezione dei Dati */
        /***********************************************/
        private void serverRicevi()
        {
            int nByteRicevuti;
            string strMsg;
            byte[] bufferRX;
            bufferRX = new byte[maxETH];
            while (true)
            {
                /* Ricevo i Dati nel Buffer e salvo le Coordinate del Client in Binary */
                nByteRicevuti = socketID.ReceiveFrom(bufferRX, maxETH, 0, ref binary);

                /* Converto il Vettore di Byte (BufferRX) in una Stringa */
                strMsg = Encoding.ASCII.GetString(bufferRX, 0, nByteRicevuti);

                /* Preparo il Messaggio ricevuto */
                clsMessaggio Messaggio = new clsMessaggio();
                Messaggio.messaggio = strMsg;
                Messaggio.ip = ((IPEndPoint)binary).Address.ToString();
                Messaggio.porta = Convert.ToUInt16(((IPEndPoint)binary).Port);

                /* Genero l' Evento per Visuaizzare i Dati Ricevuti */
                datiRicevutiEvent(Messaggio);

            }




        }

        /**********************************************************************/
        /* Avvia la Procedura di Ascolto (serverRicevi) su un Thread separato */
        /**********************************************************************/
        public void avviaServer()
        {
            // Instazio il mio Nuovo Thread
            threadAscolta = new Thread(serverRicevi);

            // Avvio il Thread
            threadAscolta.Start();

            // Aspetto finchè il Theard nonè avviato
            while (!(threadAscolta.IsAlive));

            if (threadAscolta == null)
            {
                // Avvio il Thread
                threadAscolta.Start();

                // Aspetto finchè il Theard nonè avviato
                while (!(threadAscolta.IsAlive)) ;
            }
            else if (threadAscolta.ThreadState == ThreadState.SuspendRequested)
                threadAscolta.Resume();
        }

        /***************************************************************/
        /* Arresta il Thread con la procedura di Asolto (serverRicevi) */
        /***************************************************************/
        public void arrestaServer()
        {
            // Se il Thread è attivo ==> lo chiudo
            /* NON FUNZIONA nel 100% dei casi
            if (threadAscolta.IsAlive)
            {
                threadAscolta.Abort();
            } */
            if (threadAscolta.ThreadState == ThreadState.Running)
            {
                threadAscolta.Suspend();
            }

        }

        /************************************************/
        /* Restituisce il Messaggio ricevuto sul Client */
        /************************************************/
        public clsMessaggio clientRicevi()
        {
            int nByteRicevuti;
            string strMsg;
            byte[] bufferRX;
            bufferRX = new byte[maxETH];

            /* Ricevo i Dati nel Buffer e salvo le Coordinate del Server in Binary */
            nByteRicevuti = socketID.ReceiveFrom(bufferRX, maxETH, 0, ref binary);

            /* Converto il Vettore di Byte (BufferRX) in una Stringa */
            strMsg = Encoding.ASCII.GetString(bufferRX, 0, nByteRicevuti);

            /* Preparo il Messaggio ricevuto */
            clsMessaggio Messaggio = new clsMessaggio();
            Messaggio.messaggio = strMsg;
            Messaggio.ip = ((IPEndPoint)binary).Address.ToString();
            Messaggio.porta = Convert.ToUInt16(((IPEndPoint)binary).Port);
            datiRicevutiEvent(Messaggio);
            return Messaggio;
        }

        /****************************************************************/
        /* Invia una Stringa di dati a l Binary (IP SERVER o IP CLIENT) */
        /* - nel caso del SERVER ==> Binary contiene l' IP del CLIENT   */
        /* - nel caso del CLIENT ==> Bonary contiene l' IP del SERVER   */
        /****************************************************************/
        public void inviaMsg(string strMsg)
        {
            byte[] bufferTX;

            // Serializzo la Stringa ricevuto in input
            bufferTX = Encoding.ASCII.GetBytes(strMsg);

            // Invio il Buffer al Binary
            socketID.SendTo(bufferTX, bufferTX.Length,0,binary);

        }

        /*********************************************************/
        /* Procedura che implementa il Metodo astratto Dispose() */
        /*********************************************************/
        public void Dispose()
        {
            // (1) - Ripulisce i Buffer di Comunazione
            socketID.Shutdown(SocketShutdown.Both);

            // (2) - Arresto il Thread
            if (server && threadAscolta != null)
            {
                // Se il Thread è "Sospeso" ==> lo "Riesumo"
                if (threadAscolta.ThreadState == ThreadState.SuspendRequested)
                    threadAscolta.Resume();
                threadAscolta.Abort();
            }

            // (3) - Chiudo il Socket
            socketID.Close();

        }


    }
}
