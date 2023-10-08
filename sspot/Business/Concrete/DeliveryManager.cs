using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Business.Abstract;
using Business.Feedbacks.Results;
using DataAccess.Abstract.Dal;
using DataAccess.Concrete.Dal;
using Entities.Concrete;

namespace Business.Concrete
{
    public class DeliveryManager:IDeliveryService
    {
        IDeliveryDal deliveryDal;
        public DeliveryManager(IDeliveryDal deliveryDal)
        {
            this.deliveryDal= deliveryDal;
        }

        public IDataResult<Stage> Add(Stage Delivery)
        {
            deliveryDal.Add(Delivery);
            return new DataResult<Stage>(Delivery);
        }

        public IDataResult<Stage> Delete(Stage Delivery)
        {
            deliveryDal.Delete(Delivery);
            return new DataResult<Stage>(Delivery);
        }

        public IDataResult<List<Stage>> GetAll()
        {
            return new DataResult<List<Stage>>(deliveryDal.GetAll());
        }

        public IDataResult<Stage> GetById(int id)
        {
            return new DataResult<Stage>(deliveryDal.Get(x=>x.StageId==id));
        }

        public IDataResult<Stage> Update(Stage Delivery)
        {
            deliveryDal.Update(Delivery);
            return new DataResult<Stage>(Delivery);
        }
    }
}
