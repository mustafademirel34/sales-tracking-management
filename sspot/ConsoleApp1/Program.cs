// See https://aka.ms/new-console-template for more information
using DataAccess.Concrete.Dal;
using Entities.Concrete;


EfDeliveryDal ef = new EfDeliveryDal();


var test = ef.GetAll();

foreach (Stage cstomer in test)
{
    Console.WriteLine(cstomer.PaymentMethod);
    Console.WriteLine(cstomer.ItemName,cstomer.PaymentMethod);
    Console.WriteLine(cstomer.WhenWasCreated);

}

Console.ReadLine();