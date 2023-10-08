using Entities.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Concrete
{
    public class Stage:IEntity
    {
        public int StageId { get; set; }
        public int? CustomerId { get; set; }

        public string? ItemName { get; set; }
        public int? ItemPrice { get; set; }
        public int? State { get; set; }
        public string? PaymentMethod { get; set; }
        public DateTime? WhenWasCreated { get; set; }
        public DateTime? DeliveryTime { get; set; }
        public string? Notes { get; set; }
    }
}
