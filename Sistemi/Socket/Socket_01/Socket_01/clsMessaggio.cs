using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Socket_01
{
    public class clsMessaggio
    {

        public string ip;
        public UInt16 porta;
        public string messaggio;

        public override string ToString()
        {
            // Ritorno del Metodo ToString() base
            // return base.ToString();

            return this.ip + " : " +
                this.porta.ToString() + " - " +
                this.messaggio;
        }

    }
}
