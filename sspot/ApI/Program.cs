using Business.Abstract;
using Business.Concrete;
using DataAccess.Abstract.Dal;
using DataAccess.Concrete.Dal;
using Microsoft.AspNetCore.Mvc.Formatters;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddControllers();

        //builder.Services.AddControllers().AddJsonOptions(
        //  options => options.JsonSerializerOptions.
        //  DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull);



        builder.Services.AddEndpointsApiExplorer();


        builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
        builder.Services.AddSingleton<ICustomerService, CustomerManager>();
        builder.Services.AddSingleton<IDeliveryService, DeliveryManager>();

        builder.Services.AddSingleton<ICustomerDal, EfCustomerDal>();
        builder.Services.AddSingleton<IDeliveryDal, EfDeliveryDal>();





        var app = builder.Build();

        app.UseCors(builder => builder.AllowAnyOrigin());

        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.MapControllers();

        

        app.Run();
    }
}