using Entities.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Abstract
{
    public interface IEntityRepository<A> where A : class, IEntity, new() //generic, referans tip class olmalı, IEntity referans alan olmalı
    {
        List<A> GetAll(Expression<Func<A, bool>> filter = null); //filtreye göre getir
        A Get(Expression<Func<A, bool>> filter); //filtre zorunlu
        void Add(A entity);
        void Update(A entity);
        void Delete(A entity);
    }
}
