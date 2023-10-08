import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/model/Customer';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private api:ApiService,
    private client:HttpClient
    ) { }

  getCustomerFromPhone(phone: string): Observable<Customer> {
    const url = `${this.api.Url}/customer/getfromphone?phone=${phone}`;
    return this.client.get<Customer>(url);
  }
}
