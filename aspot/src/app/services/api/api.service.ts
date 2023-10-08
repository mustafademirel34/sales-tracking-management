import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // 1: LOCALHOST --- 2: REELTESTING SERVER
  apiSelect:number=2;
  Url:string= "";

  constructor(){

    if(this.apiSelect>2 || this.apiSelect == 0)
      console.error("Api yerleştirmede sorun oluştu")
    else if(this.apiSelect==1)
      this.Url = 'https://localhost:44323';
    else if(this.apiSelect==2)
      this.Url = 'https://reeltesting.somee.com/api';

  }

}
