using Business.Abstract;
using Business.Feedbacks.Results;
using DataAccess.Abstract.Dal;
using DataAccess.Concrete.Dal;
using Entities.Concrete;
using NuGet.Protocol.Plugins;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class CustomerManager:ICustomerService
    {
        ICustomerDal customerDal;
        public CustomerManager(ICustomerDal customerDal)
        {
            
            this.customerDal = customerDal;
        }

        public IDataResult<Customer> Add(Customer customer)
        {
            customerDal.Add(customer);
            return new DataResult<Customer>(customer);
        }

        public IDataResult<Customer> Delete(Customer customer)
        {
            customerDal.Delete(customer);
            return new DataResult<Customer>(customer);
        }

        public IDataResult<List<Customer>> GetAll()
        {
            return new DataResult<List<Customer>>(customerDal.GetAll());
        }

        public IDataResult<Customer> GetById(int id)
        {
            return new DataResult<Customer>(customerDal.Get(x => x.CustomerId == id));
        }

        public IDataResult<Customer> Update(Customer customer)
        {
            customerDal.Update(customer);
            return new DataResult<Customer>(customer);
        }
    }
}
