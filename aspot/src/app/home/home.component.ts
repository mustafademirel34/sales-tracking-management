import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/api/customer.service';
import { DeliveryService } from '../services/api/delivery.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomDatePipe } from '../pipes/custom-date.pipe';
import { PrintComponent } from '../print/print.component';
import { ModalComponent } from '../modal/modal.component';
import { ShowModalService } from '../services/helper/show-modal.service';
import * as moment from 'moment';
import { DeliveryStage } from '../model/DeliveryModel';

import { LimitToMaxDirective } from '../services/helper/limit-max-directive';
import { HomeService } from '../services/helper/home.service';
import { CdkDragDrop, CdkDragEnd, CdkDragStart, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ConfigurationService } from '../services/api/configuration.service';
import { Configuration } from '../model/Configuration';
import { AuthCheckService } from '../services/auth/auth-check.service';
//aynı zamanda app module declarations eklenmeli


interface Button {
  id: number;
  name: string;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent implements OnInit{

ngOnInit(): void {

  //this.configService.fetchApiData();
//////////////////////////////////////////////////////////////////////////////////////
this.activatedRoute.queryParams.subscribe(params => {
  if ('phone' in params) {
    this.customerPhoneMain = params['phone'];
    this.homeService.getDeliveryFromPhone(this.customerPhoneMain).subscribe((ds) => { this.deliveryList=ds;} );
    this.telefAra=true;
    this.tumkayit=false;
  }
  if ('when' in params) {
    if(parseInt(params['when']) === 0)
    {
      this.BugununTarihiAra();
    }
    else{
      this.BuTariheGoreAraTarihi = params['when'];
    //2023-06-28
    console.log(this.BuTariheGoreAraTarihi)
  
    this.telefAra=false;
    this.tumkayit=false;
    this.customerPhoneMain=5;
    this.homeService.getDeliveriesFromDate(this.BuTariheGoreAraTarihi).subscribe((ds) => { this.deliveryList=ds;} );
    }
  }

  if ('calendar' in params) {
    this.setMonth(parseInt(params['calendar']) - 1);

    this.takvimmodudurum=true;
  }
  else{
    this.takvimmodudurum=false;
  }

  const currentPath = window.location.pathname;
  const hasAllParam = currentPath.includes('/all');

  if (hasAllParam) {
    this.tumkayit = true;
    this.homeService.getAllDataAll().subscribe((ds) => { this.deliveryList=ds;} );
    this.totalItems = this.deliveryList.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  }


});



//takvim günlerini doldurma

//////////////////////////////////////////////////////////////////////////////////////
}
constructor(
  private datePipe: DatePipe,
  private cs: CustomerService, 
  private ds:DeliveryService,
  private router: Router,
  private customDatePipe: CustomDatePipe,
  private printComponent:PrintComponent,
  private modalComponent:ModalComponent,
  private ms:ShowModalService,
  private activatedRoute:ActivatedRoute,
  private homeService:HomeService,
  private configService:ConfigurationService,
  private logService:AuthCheckService
){
  this.currentDate = moment();
  this.getDeliveriesByMonthYear().then(() => {
    this.generateCalendar();
  });
}

//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
////////////////////////// DEĞİŞKENLER BİLEŞENLER ARTIK BUNU YAPMAK ZORUNDA KALDIK -_-
//
telefAra:boolean=false;
tumkayit:boolean=false;
deliveryList:DeliveryStage[] = [];
//
currentPage = 1;
itemsPerPage = 10;
totalItems: number=1;
totalPages: number=1;
//
formErrorList: string[] = []; // error değil aslında ekranda gösterilecek modal uyarıları
//
takvimmodudurum:boolean=false;
//
customerPhoneMain: number = 5; // veya başlangıç değeri olarak uygun bir sayı atayın
BuTariheGoreAraTarihi: Date =new Date();//|undifined olursa servise gönderemiyoruz?
showCompletedSure:boolean=true;
showEOrH:boolean=true;
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
///////////////////////// METOTLAR /// METOTLAR /// METOTLAR /// METOTLAR /// METOTLAR

MusteriyeYeniKayit(){

  if(this.customerPhoneMain.toString().length == 10 && this.customerPhoneMain.toString().charAt(0) !== '0')
  {
    this.router.navigate(['action'], { queryParams: { phone: this.customerPhoneMain } });
  }
  else{
    this.ms.openConfirmationModal(false,"SORUN",["Lütfen telefon numarasını kontrol edini, başında sıfır olmadan 10 haneli olacak şekilde olmalıdır"]);
  }

}
setMonth(month: number) {
  this.currentDate = this.currentDate.set('month', month).startOf('month');
  this.getDeliveriesByMonthYear().then(() => {
    this.generateCalendar();
  });
}

// onDrop(event: CdkDragDrop<any>) {
//   console.log('Sürüklenen buton ID:', event.item.data);
// }

yolacikmadurum:boolean=false;
YolaCikar(){
//this.yolacikmadurum = !this.yolacikmadurum;

localStorage.setItem('Arac1', JSON.stringify(this.arac1));
localStorage.setItem('Arac2', JSON.stringify(this.arac2));
localStorage.setItem('printWhat', JSON.stringify('ToRoad'));
this.router.navigate(['print'], { });

}

rangeValue: number=0;
arac1:number[]=[];
arac2:number[]=[];

onRangeChange(event: Event,aracStageId:string) {
  const target = event.target as HTMLInputElement;
  if(target.value == '0')
  {
    const index1 = this.arac1.indexOf(parseInt(aracStageId));
    if(index1 == -1)
    {
      this.arac1.push(parseInt(aracStageId));
      this.arac2 = this.arac2.filter(item => item !== parseInt(aracStageId));  
    }
  }
  if(target.value == '1')
  {
    this.arac1 = this.arac1.filter(item => item !== parseInt(aracStageId));
    this.arac2 = this.arac2.filter(item => item !== parseInt(aracStageId));    
  }
  if(target.value == '2')
  {
    const index2 = this.arac2.indexOf(parseInt(aracStageId));
    if(index2 == -1)
    {
      this.arac2.push(parseInt(aracStageId));
      this.arac1 = this.arac1.filter(item => item !== parseInt(aracStageId));
    }
  }
  // this.rangeValue = +target.value;
  // console.log(this.rangeValue);
  console.log('arac1:', this.arac1);
  console.log('arac2:', this.arac2);
  
}

getValueByStageId(stageId: number): string {
  if (this.arac1.includes(stageId)) {
    return '0';
  } else if (this.arac2.includes(stageId)) {
    return '2';
  } else {
    return '1';
  }
}


////////////////////////////////////////////////////////////////////////////////////////////////

settingsOn:boolean=false;

settings(){
  this.settingsOn = !this.settingsOn;
}

handleButtonClick(id: string) {
  if (id === 't') {
    this.showCompletedSure = true;
  } else if (id === 'e') {
    this.showCompletedSure = false; this.showEOrH = true;
  } else if (id === 'h') {
    this.showCompletedSure = false; this.showEOrH = false;
  }
}

getItemsFromPagenation(): any[] {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  return this.deliveryList.slice(startIndex, endIndex);//idnexleyen eleman
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

MainItemPriceEdit(itemName:string){
  const sections = itemName.split('#').filter(Boolean);
    var itemPriceEdited:number=0;
    for (var section of sections) {
      const sectionData = section.split(',');
      var itemStageAmount = parseInt(sectionData[3]);
      var itemStagePrice = parseInt(sectionData[4]);
      itemPriceEdited = itemPriceEdited+(itemStagePrice*itemStageAmount);

    }
  return itemPriceEdited;
}

isExpired(date:any):boolean{
  var num = this.getDaysAgo(date);
  if(num >=3)
    return true;
  else
    return false;
}

goToDetailPage(stageId: any,takvim:boolean) {
  if(takvim)
  {
    const queryParams = {
      stageId: stageId,
      calendar: this.currentDate.month()+1//+1 --- Burada 'value' yerine calendar parametresinin değerini eklemelisiniz.
    };
    this.router.navigate(['action'], { queryParams: queryParams });
  }
  else
  {
    if(this.tumkayit)
    {
      const queryParams = {
        stageId: stageId,
       when:-1
      };
      this.router.navigate(['action'], { queryParams });
    }
    else{
      this.router.navigate(['action'], { queryParams: { stageId: stageId } });
    }
  }
 
}

StoklaraGit(){
  this.router.navigate(['stock'], {  });
}

getDaysAgo(date: any): number {
  const olus = new Date(date); const today = new Date(); // Bugünkü tarih
  const timeDiff = today.getTime() - olus.getTime(); // Milisaniye cinsinden fark hesaplanır
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // Milisaniyeyi güne çevirir
  return daysDiff;
}

getdaysAgoContent(date: any):string{
  var num = this.getDaysAgo(date); 
  var out:string="";
  if(num == 0)
    out="Bugün";
  else{
    out=num+" gün önce";
  }
  return out;
}

goToPage(page: number): void {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
  }
}

BuTelefonaGoreAra(tel:number){
  var metin:string =this.customerPhoneMain.toString();
  if(metin.length > 10)
  { 
    let test = metin.slice(0, metin.length - 1);
    this.customerPhoneMain=parseInt(test);
  }
  if(this.customerPhoneMain.toString().length === 10 && metin.charAt(0) != '0')
  {
    this.router.navigate(['home'], { queryParams: { phone: this.customerPhoneMain} });
    this.telefAra=true;
    this.tumkayit=false;
  }
}

takvimmodu(){

  this.settingsOn=false;

this.takvimmodudurum = !this.takvimmodudurum;
}

settingDelivery:boolean=true;
onToggleChange(event: Event) {
  const target = event.target as HTMLInputElement;
  this.settingDelivery=target.checked;
}

username:string='';password:string='';
updateUswPsw(){

  const config1:Configuration ={
  id: 1,
  configId: "Username",
  value: this.username,
  status: true
  };
  const config2:Configuration ={
    id: 2,
    configId: "Password",
    value: this.password,
    status: true
  };
  this.configService.UpdateConfigData(config1).subscribe((data) => {
    console.log(data)
    // config1 güncelleme tamamlandı
    this.configService.UpdateConfigData(config2).subscribe((data) => {
      console.log(data)
      // config2 güncelleme tamamlandı
      // Diğer işlemleri burada gerçekleştirin
    });
  });

  this.logService.password = this.password;

  this.ms.openConfirmationModal(false,"GÜNCELLENDİ",["Şifre güncellenmiştir. Tekrar giriş yapmanız gerekmektedir."]);

}

testing(){

}

CikisYap(){
  this.logService.logout();
  this.router.navigate(['login'], {  });
}

goToDetailPageW() {
  //this.router.navigate(['/action/new']);
  this.router.navigate(['action'], { queryParams: { stageId: 0 } });
}

openPrintModal() {
  localStorage.setItem('deliveryList', JSON.stringify(this.deliveryList));
  localStorage.setItem('printWhat', JSON.stringify('Delivery'));
  this.router.navigate(['print'], { });
}

getAllData(){
  this.tumkayit = true;
  this.router.navigate(['home/all'], { });
}

yarinaAktar(){

  var sonuc = this.ms.openConfirmationModal(true,"EMİN MİSİNİZ",[" 'Bugün' teslim edilmesi gereken tüm işlemler yarına ertelenecektir? Diğer günleri etkilemez. Ekrandaki tüm tarihler için geçerli değildir. Onaylıyor musunuz"]);
  sonuc.then((result: boolean) => {
    if (result) {
      this.ds.yarinaAktar();
      this.deliveryList.length = 0;

      this.ds.yarinaAktar().subscribe(
        (data: any) => {
          this.ms.openConfirmationModal(false,"BAŞARILI",["Bugün tamamlanması gereken işler yarına ertelendi."]);
          console.log('Teslimatlar güncellendi:', data);
        },
        (error: any) => {
          console.log('Hata:', error);
          var sonuc = this.ms.openConfirmationModal(false,"HATA",["Güncelleme işlemi sırasında bir sorun oluştu > "+error.message]);
          // Hata durumunda yapılacak işlemleri buraya ekleyin
        }
      );

    }})

}

BuTariheGoreAra()
{
  //this.homeService.getDeliveriesFromDate(this.BuTariheGoreAraTarihi).subscribe((ds) => { this.deliveryList=ds;} );
  //this.telefAra=false; this.tumkayit=false; this.customerPhoneMain=5;
  this.router.navigate(['home'], { queryParams: { when: this.BuTariheGoreAraTarihi} });
}

BuTarihiAraOncekiSonraki(s:boolean) {
  this.tumkayit=false; this.tarihiInputGoster(s);
  const formattedDate = formatDate(this.BuTariheGoreAraTarihi, 'yyyy-MM-dd', 'en-US'); // Tarihi "yyyy-mm-dd" formatına dönüştür
  this.router.navigate(['home'], { queryParams: { when: formattedDate} });
}

tarihiInputGoster(artirAzalt:boolean){
  const currentDate: Date | null = this.BuTariheGoreAraTarihi ? new Date(this.BuTariheGoreAraTarihi) : null;
  if (currentDate) {
    if(artirAzalt)
    currentDate.setDate(currentDate.getDate() + 1);
    else
    currentDate.setDate(currentDate.getDate() - 1);
    const formattedDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
    if (formattedDate) {
      const dateSendingToServer = new Date(formattedDate);
      if (!isNaN(dateSendingToServer.getTime())) {
        this.BuTariheGoreAraTarihi = dateSendingToServer;
      }
    }
  }
}

BugununTarihiAra(){
  this.telefAra=false;
  this.tumkayit=false;

  var bugun; this.homeService.BugununTarihiNedir().subscribe((ds) => { bugun=ds;} );
  if(bugun)
  this.BuTariheGoreAraTarihi = bugun; //aslında gerek yok da neyse //*00

  const formattedDate = formatDate(this.BuTariheGoreAraTarihi, 'yyyy-MM-dd', 'en-US'); // Tarihi "yyyy-mm-dd" formatına dönüştür
  this.router.navigate(['home'], { queryParams: { when: formattedDate} });

}

//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
////////////////////////// TAKVİMLE İLGİLİ ALAN -_-

currentDate: moment.Moment;
monthDays: { day: number; isCurrentMonth: boolean; }[] = [];
dayNames: string[] = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

buaykiteslimatlar:DeliveryStage[]=[];

previousMonth() {
  this.currentDate = this.currentDate.subtract(1, 'month');
  this.getDeliveriesByMonthYear().then(() => {
    this.generateCalendar();
  });
}

nextMonth() {  //this.currentDate = moment().set('month', 1).startOf('month');
  this.currentDate = this.currentDate.add(1, 'month');
  this.getDeliveriesByMonthYear().then(() => {
    this.generateCalendar();
  });
}


getDeliveriesByMonthYear(): Promise<void> {
  return new Promise((resolve, reject) => {
    const formattedMonth = moment(this.currentDate).format('MM');
    const formattedYear = moment(this.currentDate).format('YYYY');
    this.ds.getDeliveriesByMonthYear(parseInt(formattedYear), parseInt(formattedMonth))
      .subscribe({
        next: (deliveries) => {
          this.buaykiteslimatlar = deliveries.data;
          // Perform necessary operations with the delivery data here
          resolve(); // Resolve when the subscription is completed
        },
        error: (error) => {
          console.log('API hatası:', error);
          reject(error); // Reject in case of an error
        },
        complete: () => {
          // Optional: Perform any cleanup or completion tasks here
        }
      });
  });
}



generateCalendar() {
  const startOfMonth = moment(this.currentDate).startOf('month');
  const endOfMonth = moment(this.currentDate).endOf('month');
  const daysInMonth = endOfMonth.date();

  const calendarStart = moment(startOfMonth).startOf('week').startOf('day');
  //const calendarStart = moment(startOfMonth).startOf('week').add(0, 'day'); // ? pzt başlaması için yaptık ama gerek kalmadı
  const calendarEnd = moment(endOfMonth).endOf('week');

  const calendar = [];
  let calendarDay = moment(calendarStart);

  while (calendarDay.isSameOrBefore(calendarEnd)) {
    const dayData = {
      day: calendarDay.date(),
      isCurrentMonth: calendarDay.isSame(this.currentDate, 'month'),
      fullDate: calendarDay.format('YYYY-MM-DD')
    };
    calendar.push(dayData);
    calendarDay.add(1, 'day'); // Döngüyü ilerletmek için günü bir artırın
     // bunu ben kapattım günler gelmedi-_- ulan yaaaaaaaaaaaaaaaaaaaaaaaaaa
  }
  this.monthDays = calendar;
}


isDeliveryDay(date: string): DeliveryStage[] {
  const formattedDate = moment(date).format('YYYY-MM-DD');
  const deliveries = this.buaykiteslimatlar.filter(delivery => moment(delivery.deliveryTime).format('YYYY-MM-DD') === formattedDate);
  return deliveries;
  // return deliveries.map(delivery => {
  //   const formattedDeliveryTime = moment(delivery.deliveryTime).format('HH:mm');
  //   return {
  //     ...delivery,
  //     formattedDeliveryTime: formattedDeliveryTime
  //   };
  // });
}

/// BİTİŞ
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

}