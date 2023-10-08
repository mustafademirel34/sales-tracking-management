import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DeliveryStage } from '../model/DeliveryModel';
import { CustomerService } from '../services/api/customer.service';
import { DeliveryService } from '../services/api/delivery.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControllerService } from '../services/helper/form-controller.service';
import { DatePipe } from '@angular/common';
import { ShowModalService } from '../services/helper/show-modal.service';
import { Customer } from '../model/Customer';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit{



  ngOnInit(): void {


    this.activatedRoute.queryParams.subscribe(params => {
      if ('stageId' in params) {
        this.stageId = params['stageId'];
        if (this.stageId == 0) {
          this.BosluklariDoldur();
        } else {
          this.VerileriGetir();
        }
      }
    
      if ('phone' in params) {
        this.delivery.phone = params['phone'];
        this.getCustomerFromPhone();
      }

      if ('calendar' in params) {
        this.calendarNumb = params['calendar'];   
      }
    
      
    });
    
    // this.activatedRoute.queryParams.subscribe(params => {
    //   this.stageId = params['stageId'];
    //   if(this.stageId == 0)
    //   {
    //     this.BosluklariDoldur();
    //   }
    //   else{
    //     this.VerileriGetir();
    //   }
    // });

    // this.activatedRoute.queryParams.subscribe(params => {
    //   this.delivery.phone = params['phone'];
    //   this.getCustomerFromPhone();
    // });

      // this.activatedRoute.params.subscribe(params => {
      //   if (params["stageId"]) {

      //     this.stageId = params["stageId"];
          
      //     console.log(this.stageId + " > VAR OLAN GÖSTERİLİYOR");
  
      //     this.VerileriGetir();

      //   } else {
      //     console.log("YENİ EKLE");
      //     this.stageId = 0;
      //     this.BosluklariDoldur();
      //   }
      // });


      console.log("----------------------------------------------");
      console.log("buuuuuu" +this.delivery);
      
  }

  stageId:number = 0;
  calendarNumb:number=0;

  
  VerileriGetir() {

    this.ds.getDeliveryFromId(this.stageId).subscribe(
      (data: DeliveryStage) => {
        this.delivery = data;
        this.formatDeliveryDates();//tarih format ayarları
        this.SatislariEkranaYaz();//satış formu düzenlemeleri
      },
      (error: any) => {
        this.ms.openConfirmationModal(false,"HATA",["Veriler veritabanından alınırken bir sorun oluştu > "+error.message])
        console.log('Hata:', error);
      }
    );

    

  }


  SatislariEkranaYaz(){
    
    const sections = this.delivery.itemName.split('#').filter(Boolean);

        // Verileri array'e atama
      this.satirlar = [];
      for (const section of sections) {
        const sectionData = section.split(',');
        const id = parseInt(sectionData[0]);
        const itemStageName = sectionData[1];
        const itemStageType = sectionData[2];
        const itemStageAmount = parseInt(sectionData[3]);
        const itemStagePrice = parseInt(sectionData[4]);
        const itemStageDiscount = parseInt(sectionData[5]);

        const yeniSatir = {
          id: id,
          itemStageName: itemStageName,
          itemStageType: itemStageType,
          itemStageAmount: itemStageAmount,
          itemStagePrice: itemStagePrice,
          itemStageDiscount: itemStageDiscount
        };

        this.toplamFiyat = this.toplamFiyat+yeniSatir.itemStagePrice*yeniSatir.itemStageAmount;
        this.toplamIskonto = this.toplamIskonto+yeniSatir.itemStageDiscount;
        this.satirlar.push(yeniSatir);
      }



  }

  isiErtele(kacGun:number){

    if(this.formControl.validateDelivery(this.delivery))
    {
      const date1 = this.delivery.deliveryTime ? new Date(this.delivery.deliveryTime) : null;
      if (date1) {
        date1.setDate(date1.getDate() + kacGun);
        this.delivery.deliveryTime = date1.toISOString().substr(0, 10);
        this.updateDelivery();
  
      } else {
        this.delivery.deliveryTime = null;
      }
    }
  
  }


  formatDeliveryDates() {

    const date1 = this.delivery.whenWasCreated ? new Date(this.delivery.whenWasCreated) : null;
    if (date1) {
      date1.setDate(date1.getDate() + 1);
      this.delivery.whenWasCreated = date1.toISOString().substr(0, 10);
    } else {
      this.delivery.whenWasCreated = null;
    }

    const date2 = this.delivery.deliveryTime ? new Date(this.delivery.deliveryTime) : null;
    if (date2) {
      date2.setDate(date2.getDate() + 1);
      this.delivery.deliveryTime = date2.toISOString().substr(0, 10);
    } else {
      this.delivery.deliveryTime = null;
    }
  }


//this.delivery.deliveryTime = new Date(iso);

    // const today = new Date();
    // const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    // const tomorrowISOString = tomorrow.toISOString();//.split('T')[0];
    
    // //this.delivery.deliveryTime = new Date(tomorrowISOString);

    // this.delivery.deliveryTime = tomorrow;

    // console.log("!- "+tomorrow.getDate(), tomorrow.getMonth(),tomorrow.getFullYear());

    // console.log("** "+this.delivery.deliveryTime);
    // console.log(">> "+tomorrowISOString);
  


  constructor(private cs: CustomerService, private ds:DeliveryService,private activatedRoute:ActivatedRoute
    ,private router: Router,private datePipe: DatePipe,private formControl:FormControllerService,
    private changeDetectorRef: ChangeDetectorRef
    ,private ms:ShowModalService


    
    
    ){
this.delivery.itemPrice=0;
    }


  delivery: DeliveryStage = {
    itemName: '',
    itemPrice: null,
    state: '',
    paymentMethod: null,
    whenWasCreated: null,
    deliveryTime: null,
    isCompleted:false,
    customerNotes: '',
    deliveryNotes: '',
    paymentNotes:'',
    customerName: '',
    phone: '',
    address: '',
  };

  // resetDeliveryData() {
 
  //   this.delivery = {
  //     itemName: '',
  //     itemPrice: null,
  //     state: '',
  //     paymentMethod: null,
  //     whenWasCreated: null,
  //     deliveryTime: null,
  //     customerNotes: '',
  //     stageNotes: '',
  //     customerName: '',
  //     phone: '',
  //     address: '',
      
  //   };
  // }

yas(){
  
  console.log("buuuuuu" +this.delivery);
}

  BosluklariDoldur(){
    //YENİ KAYIT OLDUĞUNDA GEREKLİ AYARLAMALAR

    const date1 =  new Date();

    const today = new Date();
  const tomorrow = new Date();

  tomorrow.setDate(tomorrow.getDate() + 1);
  today.setDate(today.getDate());

  const todayFormatted = today.toISOString().split('T')[0];
  const tomorrowFormatted = tomorrow.toISOString().split('T')[0];

  this.delivery.whenWasCreated = todayFormatted;
  this.delivery.deliveryTime = tomorrowFormatted;

    this.delivery.paymentMethod="Nakit";
    this.delivery.state = "Teslimat";
    this.delivery.itemPrice = 0;
    this.delivery.phone='';
    this.delivery.itemName = "";

  }

  musteriVarMi:boolean=false;
  customer:Customer|undefined;

  getCustomerFromPhone() {

    if(this.delivery.phone.toString().length > 10)
    {
      let test = this.delivery.phone.toString().slice(0, this.delivery.phone.toString().length - 1);
      this.delivery.phone=test;
    }

    if(this.delivery.phone.toString().length === 10)
    {
      this.cs.getCustomerFromPhone(this.delivery.phone).subscribe(
        (customerData) => {
          this.customer = customerData;
          this.delivery.customerName = this.customer?.customerName ?? '';
          this.delivery.address = this.customer?.address ?? '';
          this.delivery.customerNotes = this.customer?.customerNotes ?? '';
          this.delivery.phone = this.delivery.phone;
  
          //this.delivery.phone = this.customer.phone
  
          // if(this.delivery.customerName != "")
          // {
          //   this.musteriVarMi = true;
          // }
        },
        (error) => {
          console.log('Hata:', error);
          //this.musteriVarMi = false;
        }
      );
    }
    //this.musteriVarMi = false;

  }



  updateDelivery(): void {
    
    const string = this.satirlar.map(item =>
      `#${item.id},${item.itemStageName},${item.itemStageType},${item.itemStageAmount},${item.itemStagePrice},${item.itemStageDiscount}`
    ).join(',');

    this.delivery.itemName = string;

    if(this.formControl.validateDelivery(this.delivery))
      {
        this.delivery.stageId=this.stageId;
        this.ds.updateDelivery(this.delivery).subscribe(
          (data: DeliveryStage) => {
            this.ms.openConfirmationModal(false,"BAŞARILI",["Kayıt güncellendi."]);
            console.log('Teslimat güncellendi:', data);
            //this.router.navigate(['']);
            // Başarılı güncelleme durumunda yapılacak işlemleri buraya ekleyin
          },
          (error: any) => {
            console.log('Hata:', error);
            var sonuc = this.ms.openConfirmationModal(false,"HATA",["Güncelleme işlemi sırasında bir sorun oluştu > "+error.message]);
            // Hata durumunda yapılacak işlemleri buraya ekleyin
          }
        );
      }
      
   
  }


  routest(){
   

  }

  deleteDelivery(){
 
    var sonuc = this.ms.openConfirmationModal(true,"EMİN MİSİNİZ",["Bu kayıt tamamen kalıcı olarak silinecektir?"]);

    sonuc.then((result: boolean) => {
      // Promise başarıyla çözüldüğünde yapılacak işlemler
      if (result) {
        this.ds.deleteDelivery(this.stageId).subscribe(
          (data: DeliveryStage) => {
            console.log('Teslimat güncellendi:', data);
            this.router.navigate(['home'], { queryParams: { when: this.delivery.deliveryTime} });
            // Başarılı güncelleme durumunda yapılacak işlemleri buraya ekleyin
          },
          (error: any) => {
            console.log('Hata:', error);
            // Hata durumunda yapılacak işlemleri buraya ekleyin
          }
        );
      }})

    
  }


  detailBaslikNe():string{
    if(this.delivery.isCompleted)
    {
      return "Tamamlandı:";
    }
    else{
      return "Hedef:";
    }
  }

  YeniTeslimEkle(): void {

    const string1 = this.satirlar.map(item =>
      `#${item.id},${item.itemStageName},${item.itemStageType},${item.itemStageAmount},${item.itemStagePrice},${item.itemStageDiscount}`
    ).join(',');

    this.delivery.itemName = string1;
///////////////////////UFAK ÇAPLI/////////////////////////////////
    const date2 =  new Date()
    this.delivery.whenWasCreated = date2.toISOString().substr(0, 10);

    if(this.delivery.phone.toString().length > 10 )
    {
      this.delivery.phone = this.delivery.phone.substring(0, this.delivery.phone.length - 1);
      //fazla yazılıyordu sonuncu varsx eklettirmedik
    }
///////////////////////UFAK ÇAPLI/////////////////////////////////

    if(this.formControl.validateDelivery(this.delivery))
    {
      this.ds.YeniTeslimEkle(this.delivery).subscribe({
        next: (response) => {

          if (response && response.data && response.data.length > 0 && response.data[0].hasOwnProperty('stageId')) {
            this.delivery.stageId = response.data[0].stageId;
          }
          this.stageId = response;
          this.delivery.stageId = response;
          //console.log('API Yanıtı:', response);
          //console.log('Eklendi');
          var sonuc = this.ms.openConfirmationModal(true,"BAŞARILI",["Yeni kayıt sisteme eklendi. Kayıt numarası: "+this.stageId+".","","Fiş çıktısı almak ister misiniz?"]);

          sonuc.then((result: boolean) => {
            // Promise başarıyla çözüldüğünde yapılacak işlemler
            if (result) {
              setTimeout(() => {
                this.printDeliveryReceipt();
              }, 0);
              
            } else {
              // Sonuç false ise
            }
          })

          //
          // İsteğe bağlı olarak başarı durumunda yapılacak işlemleri buraya ekleyebilirsiniz.
        },
        error: (error) => {
          console.error('API Hatası:', error);
          this.ms.openConfirmationModal(false,"HATA",["Kayıt sırasında bir sorun oluştu > "+error.message]);
        }
      });

    }
  
   
  }

  printDeliveryReceipt(){
       //localStorage.setItem('deliveryList', JSON.stringify(this.deliveryList));
       localStorage.setItem('delivery', JSON.stringify(this.delivery));
       localStorage.setItem('printWhat', JSON.stringify('Ticket'));
       //window.open('print', '_blank');       
       this.router.navigate(['print']);
      
      //  window.print();
  }

  gotoHome(){
    // this.router.navigate(['']);

    this.activatedRoute.queryParams.subscribe(params => {

      if ('when' in params) {
        if(parseInt(params['when']) == -1)
        {
          this.router.navigate(['home/all'], { });
        }
      }
      else if ('phone' in params) {
        this.router.navigate(['home'], { queryParams: { phone: params['phone']} });
        // // Customer parametresi var, burada customerId'i kullanabilirsiniz
        // console.log('Customer ID:', customerId);
      } else if ('calendar' in params && 'stageId' in params) {
        const queryParams = {
         // when: this.stageId == 0 ? this.delivery.whenWasCreated : this.delivery.deliveryTime,
          calendar: this.calendarNumb // Burada 'value' yerine calendar parametresinin değerini eklemelisiniz.
        };
        this.router.navigate(['home'], { queryParams: queryParams });
        // ID parametresi var, burada itemId'i kullanabilirsiniz
      } else if ('stageId' in params) {//sonradan düzenleyemediğimiz için burada özelleştirdik queryparams yokyani
        this.router.navigate(['home'], { queryParams: { when: this.stageId == 0 ? this.delivery.whenWasCreated : this.delivery.deliveryTime} });
        // ID parametresi var, burada itemId'i kullanabilirsiniz
      } 
      
      
      else {
        // Herhangi bir parametre yok
        console.log('action sayfası herhangi parametre bulunamadı');
      }
    });


   
    
  }

  updateButCompleted(){
    if(this.formControl.validateDelivery(this.delivery))
    {
      this.BugununTarihiniGoster();
      this.delivery.isCompleted=true;
      this.updateDelivery();
    }
  }


  onSwitchChange(){
    var sonuc = this.ms.openConfirmationModal(true,"EVET ŞİMDİ NAPICAZ",["Bu işlemin tamamlandığına dair onayı veriniz. Teslim tarihi fark etmeksizin, bugün tamamlanmış sayılacaktır. Onaylanırsa daha sonra değiştirme yapılamaz."]);
    sonuc.then((result: boolean) => {
      // Promise başarıyla çözüldüğünde yapılacak işlemler
      if (result) {
        this.updateButCompleted();
      } else {
        this.delivery.isCompleted=false;
      }
    })
  }



  BugununTarihiniGoster(){
    const date1 =  new Date();
    if (date1) {
      date1.setDate(date1.getDate());
      this.delivery.deliveryTime = date1.toISOString().substr(0, 10);
    } else {
      this.delivery.deliveryTime = null;
    }
  }


  // rows: any[] = [
  //   { column1: 'Data 1', column2: 'Data 2', column3: 'Data 3', isHidden: false },
  //   { column1: 'Data 4', column2: 'Data 5', column3: 'Data 6', isHidden: false },
  //   // Add more rows if needed
  // ];
  


  satirlar: any[] = [];

  itemStageName:string='';
  itemStageType:string='';
  itemStageAmount:number=1;
  itemStagePrice:number=1;
  itemStageDiscount:number=0;


  satirEkle() {
    const yeniSatir = {
      id: this.satirlar.length + 1,
      itemStageName: this.itemStageName,
      itemStageType: this.itemStageType,
      itemStageAmount: this.itemStageAmount,
      itemStagePrice: this.itemStagePrice,
      itemStageDiscount: this.itemStageDiscount
    };
    this.satirlar.push(yeniSatir);
    this.fiyatiGuncelle(true,yeniSatir);

  }

  satirSil(id: number) {
    const index = this.satirlar.findIndex(satir => satir.id === id);
    if (index !== -1) {
      var ne:any = this.satirlar[index];
      this.satirlar.splice(index, 1);
      this.fiyatiGuncelle(false,ne);
    }
  }

  toplamFiyat: number = 0;
  toplamIskonto: number = 0;
  

  fiyatiGuncelle(indirazalt: boolean, satir: any) {
    if (indirazalt) {
      this.toplamFiyat += satir.itemStagePrice *satir.itemStageAmount;
      this.toplamIskonto+=satir.itemStageDiscount;
    } else {
      this.toplamFiyat -= satir.itemStagePrice*satir.itemStageAmount;
      this.toplamIskonto-=satir.itemStageDiscount;
    }
    this.delivery.itemPrice =  (this.toplamFiyat)-this.toplamIskonto;
  }
  
  


  OdemeYap(){
    
    if (this.delivery && this.delivery.itemPrice !== null) {
      if(this.delivery.itemPrice < (this.toplamFiyat-this.toplamIskonto))
      {
        this.delivery.paymentNotes = `${this.delivery.itemPrice} TL ${this.delivery.paymentMethod} alındı. Teslimatta ${(this.toplamFiyat-this.toplamIskonto)-this.delivery.itemPrice} tahsil edilecektir.`;
      }
      else{
        this.delivery.paymentNotes = `${this.delivery.itemPrice} TL ${this.delivery.paymentMethod} alındı.`;
      }
     
    }
    
    
  }



}
  




