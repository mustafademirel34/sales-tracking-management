using Business.Feedbacks.Results;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstract
{
    public interface IDeliveryService
    {
        IDataResult<List<Stage>> GetAll();
        IDataResult<Stage> GetById(int id);
        IDataResult<Stage> Add(Stage Delivery);
        IDataResult<Stage> Update(Stage Delivery);
        IDataResult<Stage> Delete(Stage Delivery);
    }
}
