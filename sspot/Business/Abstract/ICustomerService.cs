using Business.Feedbacks.Results;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstract
{
    public interface ICustomerService
    {
        IDataResult<List<Customer>> GetAll();
        IDataResult<Customer> GetById(int id);
        IDataResult<Customer> Add(Customer customer);
        IDataResult<Customer> Update(Customer customer);
        IDataResult<Customer> Delete(Customer customer);
    }
}
