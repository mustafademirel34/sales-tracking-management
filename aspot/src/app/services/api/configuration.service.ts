import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, catchError, throwError } from 'rxjs';
import { Configuration } from 'src/app/model/Configuration';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor(
    private client: HttpClient,
    private api: ApiService
  ) { 
    //this.fetchApiData();
  }

  apiData: any;

  fetchApiData(): void {
    const apiUrl = this.api.Url + "/configuration/getall";
    this.client.get(apiUrl).pipe(
      catchError(this.handleError)
    ).subscribe(
      (data: any) => {
        this.apiData = data;
        // Başarılı durumda yapılacak işlemler
      }
    );
  }

  handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      // İstemci tarafından kaynaklı hata
      alert('Bir hata oluştu: ' + error.error.message)
    } else {
      // Sunucu tarafından dönen hata durumu
      alert(`Sunucudan kaynaklı hata. Kod ${error.status}, mesaj: ${error.message}`)
    }
    //return throwError(this.errorMessage);
  }


  logintry(username: string, password: string): Observable<boolean> {
    // API'ye kullanıcı adı ve şifreyi göndererek kontrolü gerçekleştir
    const url = this.api.Url + "/configuration/logintry";
    const params = new HttpParams()
      .set('usw', username)
      .set('psw', password);
  
    return this.client.post<boolean>(url, null, { params });
  }

  GetAllConfigData(): Observable<Configuration[]> {
    const wholeUrl = this.api.Url + "/configuration/getall";
    return this.client.get<Configuration[]>(wholeUrl);
  }

  getPass(): Observable<Configuration> {
    const wholeUrl = this.api.Url + "/configuration/GetPassword";
    return this.client.get<Configuration>(wholeUrl);
  }

  UpdateConfigData(c: Configuration): Observable<Configuration> {
    const url = `${this.api.Url}/configuration/update`;
    return this.client.post<Configuration>(url, c);
  }
}
