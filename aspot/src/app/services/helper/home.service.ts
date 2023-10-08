import { Injectable } from '@angular/core';
import { DeliveryService } from '../api/delivery.service';
import { DeliveryStage } from 'src/app/model/DeliveryModel';
import { Observable, catchError, map, of } from 'rxjs';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  //HOME COMPONENT TS YÜK OLMAMASI İÇİN GEREKEN İŞLEMLER BURADA YAPILACAKTIR.
  //BURASI API SERVİSLERİ İLE İLETİŞİMDE OLABİLİR VE VERİ AKTARABİLİR
///////////////////////////////////////////////////////////////////////////////////////////////////////////
constructor(
  private ds:DeliveryService,
  private datePipe:DatePipe
){}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
getDeliveryFromPhone(phone: number): Observable<DeliveryStage[]> {
  return this.ds.getDeliveryFromPhone(phone.toString()).pipe(
    map((deliveryData) => deliveryData.data),
    catchError((error) => {
      console.log('Hata:', error);
      return of([]);
    })
  );
}
getDeliveriesFromDate(date: Date): Observable<DeliveryStage[]> {
  return this.ds.getDeliveriesFromDate(date).pipe(
    map((deliveryData) => deliveryData.data),
    catchError((error) => {
      console.log('Hata:', error);
      return of([]);
    })
  );
}
getAllDataAll(): Observable<DeliveryStage[]> {
  return this.ds.getAllDataAll().pipe(
    map((deliveryData) => deliveryData.data),
    catchError((error) => {
      console.log('Hata:', error);
      return of([]);
    })
  );
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

BugununTarihiNedir(): Observable<Date | null> {
  const currentDate: Date = new Date();
  const formattedDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
  if (formattedDate) {
    const dateSendingToServer = new Date(formattedDate);
    if (!isNaN(dateSendingToServer.getTime())) {
      return of(dateSendingToServer);
    }
  }
  return of(null);
}



  

}
