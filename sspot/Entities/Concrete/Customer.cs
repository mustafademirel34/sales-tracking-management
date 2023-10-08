using Entities.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Concrete
{
    public class Customer:IEntity
    {
        public int CustomerId { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }//databsede varchar olduğu için hata yaşadım mesela
        public string Adress { get; set; }
        public string Notes { get; set; }
    }
}
