import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DeliveryData, DeliveryStage } from 'src/app/model/DeliveryModel';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor(
    private client:HttpClient,
    private datePipe:DatePipe,
    private api:ApiService
  ) { }

  getAllDataAll(): Observable<DeliveryData<DeliveryStage>> {
    const wholeUrl = this.api.Url+"/stage/getall";
    return this.client.get<DeliveryData<DeliveryStage>>(wholeUrl);
  }


  getDeliveriesByMonthYear(year: number, month: number): Observable<DeliveryData<DeliveryStage>> {
    const url = `${this.api.Url}/stage/getDeliveriesByMonthYear?year=${year}&month=${month}`;
    return this.client.get<DeliveryData<DeliveryStage>>(url);
  }

  yarinaAktar(): Observable<string> {
    const url = this.api.Url + "/stage/transfertomorrow";
    return this.client.get(url, { responseType: 'text' }).pipe(
      map(response => response as string)
    );
  }

  getDeliveryFromId(id: any): Observable<DeliveryStage> {
    const wholeUrl = this.api.Url + "/stage/getfromid?id=" + id;
    return this.client.get<DeliveryStage>(wholeUrl);
  }

  getDeliveriesTruck(arac: number[]): Observable<DeliveryStage[]> {
    const aracString = arac.join(',');
    const wholeUrl = this.api.Url + `/stage/getfromids?arac=${aracString}`;
    return this.client.get<DeliveryStage[]>(wholeUrl);
  }
  
  
  getDeliveryFromPhone(phone: string): Observable<DeliveryData<DeliveryStage>> {
    const phoneString = phone.toString(); // Telefon numarasını bir dizeye dönüştür
    // const phoneString = phone.toString(); // Telefon numarasını bir dizeye dönüştür
    const wholeUrl = this.api.Url+"/stage/getfromphone?phone="+phone;
    return this.client.get<DeliveryData<DeliveryStage>>(wholeUrl);
  }

  getDeliveriesFromDate(date:any): Observable<DeliveryData<DeliveryStage>> {
    const formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    //const url = `https://localhost:44323/stage/GetFromDate?date=${formattedDate}`;
     const wholeUrl = this.api.Url+"/stage/getfromdate?date="+formattedDate;
     console.log(wholeUrl);
     return this.client.get<DeliveryData<DeliveryStage>>(wholeUrl);
   }

  getTomorrowDate(): Observable<any> {
     const wholeUrl = this.api.Url+"/stage/tomorrowdate";
     return this.client.get<any>(wholeUrl);
   }

  getDeliveriesToday(): Observable<DeliveryData<DeliveryStage>> {
    const wholeUrl = this.api.Url+"/stage/GetToday";
    return this.client.get<DeliveryData<DeliveryStage>>(wholeUrl);
  }


  YeniTeslimEkle(delivery: DeliveryStage):Observable<any>{
      const url = this.api.Url+"/stage/add"; // Gönderilecek API endpoint URL'sini buraya girin
      return this.client.post(url, delivery);
    }
  
    updateDelivery(delivery: DeliveryStage): Observable<DeliveryStage> {
      const url = `${this.api.Url}/stage/update?id=${delivery.stageId}`;
      return this.client.put<DeliveryStage>(url, delivery);
    }

    deleteDelivery(deletedId: number): Observable<DeliveryStage> {
      const url = `${this.api.Url}/stage/delete?id=${deletedId}`;
      return this.client.put<DeliveryStage>(url, deletedId);
    }
}
