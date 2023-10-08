using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Feedbacks.Results
{
    public class DataResult<T> : Result, IDataResult<T>
    {
        public DataResult(T data)
        {
            Data = data;
        }
        public T Data { get; set; }
    }
}
