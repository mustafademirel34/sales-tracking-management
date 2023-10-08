import { Component, OnInit } from '@angular/core';
import { DeliveryData, DeliveryStage } from '../model/DeliveryModel';
import { Router } from '@angular/router';
import { DeliveryService } from '../services/api/delivery.service';
import { Observable, catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {

  deliveryList: DeliveryStage[] = [];

  printWhat:number=0;


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
    phone: "",
    address: '',
  };
  
  constructor(private router: Router,
    private ds:DeliveryService
    ) {
  
  }

  satirlar:any[]=[]

  ngOnInit(): void {
    var deliveryListData = localStorage.getItem('deliveryList');
    var deliveryData = localStorage.getItem('delivery');
    
    var arac1 = localStorage.getItem('Arac1');
    var arac2 = localStorage.getItem('Arac2');

    const printWhat = localStorage.getItem('printWhat');

    var printWhatString = localStorage.getItem('printWhat');

    if(printWhatString)
      printWhatString = printWhatString.replace(/"/g, '');
  
    if (deliveryListData && printWhatString == "Delivery") {
      this.deliveryList = JSON.parse(deliveryListData);   
      this.printWhat = 1;  
      this.doPrint();
    }
    
    if (deliveryData && printWhatString == "Ticket") {
      this.delivery = JSON.parse(deliveryData);
      this.printWhat = 2;  
      this.satirlaridoldur().then(() => {
        this.doPrint();
      });
    } 

    if (arac1 && arac2 && printWhatString == "ToRoad") {

      
      this.arac1 = JSON.parse(arac1);
      this.arac2 = JSON.parse(arac2);

      console.log("AAA"+this.arac1);
      console.log("AAA"+ this.arac2);

      this.printWhat = 3;
this.loadDeliveriesForTrucks();

   
    }

  }

  loadDeliveriesForTrucks(): void {
    this.ds.getAllDataAll().subscribe(
      (data: DeliveryData<DeliveryStage>) => {
        const arac2Ids = this.arac2.map(String);
        const arac1Ids = this.arac1.map(String);
      
  
        this.arac1teslimatlar = data.data.filter(
          (delivery: DeliveryStage) => arac1Ids.includes(String(delivery.stageId))
        );
  
        this.arac2teslimatlar = data.data.filter(
          (delivery: DeliveryStage) => arac2Ids.includes(String(delivery.stageId))
        );
  
        // loadDeliveriesForTrucks tamamlandığında başka bir metot çalışsın
       this.doPrint();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  
  
  
  
  
  
  
  
  
  arac1teslimatlar:DeliveryStage[]=[];arac2teslimatlar:DeliveryStage[]=[];
  arac1:number[] = [];arac2:number[] = [];

  doPrint(): void {
    // Çıktı alma işlemi öncesindeki içeriği gizle
    setTimeout(() => {
      window.print();
       // Çıktı alma işlemi sonrasındaki içeriği göster
       this.router.navigate(['home'], { queryParams: { when:0 } });
    }, 300);//PRINT LE İLGİLİ SORUN OLURSA ARTIR SIFIRI

  }
  
  
  MainItemNameEdit(itemName:string):string{
    const sections = itemName.split('#').filter(Boolean);
      var itemNameEdited:string='';
      for (var section of sections) {
        const sectionData = section.split(',');
        var itemStageName = sectionData[1];
        if(itemNameEdited != '')
         itemNameEdited += ", "+itemStageName;
         else
         itemNameEdited += itemStageName;
        
      }
    return itemNameEdited;
  }

  async satirlaridoldur(): Promise<void> {
    const sections = this.delivery.itemName.split('#').filter(Boolean);

    // Verileri array'e atama
    this.satirlar = [];
    this.toplamFiyat = 0;
    this.toplamIskonto = 0;
  
    for (const section of sections) {
      const sectionData = section.split(',');
      const id = parseInt(sectionData[0]);
      const itemStageName = sectionData[1];
      const itemStageType = sectionData[2];
      const itemStageAmount = parseInt(sectionData[3]);
      const itemStagePrice = parseInt(sectionData[4]);
      const itemStageDiscount = parseInt(sectionData[5]);
      const itemStageTotal= 0;
  
      const yeniSatir = {
        id: id,
        itemStageName: itemStageName,
        itemStageType: itemStageType,
        itemStageAmount: itemStageAmount,
        itemStagePrice: itemStagePrice,
        itemStageDiscount: itemStageDiscount,
        itemStageTotal: itemStageAmount*itemStagePrice
      };
  
      this.toplamFiyat += yeniSatir.itemStagePrice*itemStageAmount;
      this.toplamIskonto += yeniSatir.itemStageDiscount;
      this.satirlar.push(yeniSatir);
    }
  }
  


toplamFiyat: number = 0;
toplamIskonto: number = 0;






  
}









