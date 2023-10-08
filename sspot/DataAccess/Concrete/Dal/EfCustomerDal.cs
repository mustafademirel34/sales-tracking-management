using DataAccess.Abstract.Dal;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Concrete.Dal
{
    public class EfCustomerDal:EfRepositoryBase<Customer,DatabaseContext>,ICustomerDal
    {

    }
}
