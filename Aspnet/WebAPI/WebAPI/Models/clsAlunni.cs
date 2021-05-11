using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class clsAlunni
    {
        public int IDAlunno { get; set; }
        public string Nome { get; set; }
        public string Cognome { get; set; }
        public int IDClasse { get; set; }
    }
}