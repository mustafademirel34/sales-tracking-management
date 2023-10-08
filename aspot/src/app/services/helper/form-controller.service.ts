import { Injectable } from '@angular/core';
import { DeliveryStage } from 'src/app/model/DeliveryModel';
import { ShowModalService } from './show-modal.service';

@Injectable({
  providedIn: 'root'
})
export class FormControllerService {
  constructor(private ms:ShowModalService){}

  errors: string[] = []; // Hataları içeren dizi
  isValid: boolean = true; // Geçerli olup olmadığını belirten boolean değer

  validateDelivery(delivery: DeliveryStage):boolean{
    // Validasyon işlemleri gerçekleştirilir
    // ...
   
    this.isValid=true;
    this.errors=[];

if(delivery.itemName.length <  6)
{
  this.errors.push("Ürün ismi yetersiz tespit edildi. Daha açıklayıcı ürün bilgisi giriniz.");
  this.isValid=false;
}
if(delivery.customerName.length <  3)
{
  this.errors.push("Müşteri ismini lütfen doğru bir şekilde giriniz");
  this.isValid=false;
}
if(delivery.phone.length !== 10)
{
  this.errors.push("Müşteri telefon numarasıyla ilgili sorun var"+delivery.phone);
  this.isValid=false;
}
if( delivery.itemPrice == 0)
{
  this.errors.push("Kayıt açılabilmesi için en az 1 tl'lik ürün satışı olmalıdır");
  this.isValid=false;
}
if(delivery.address.length < 10 )
{
  this.errors.push("Adres bilgisi yetersiz görünüyor");
  this.isValid=false;
}

  if(!this.isValid)
    this.ms.openConfirmationModal(false,"FORMDA HATALAR MEVCUT",this.errors);
    return this.isValid;

}
  

}
