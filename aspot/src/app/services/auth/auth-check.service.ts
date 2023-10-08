// auth-check.service.ts
import { Injectable } from '@angular/core';
import { ConfigurationService } from '../api/configuration.service';

@Injectable({
  providedIn: 'root'
})
export class AuthCheckService {

  authenticated: boolean = true; // ŞİFRE SORMA : TRUE
  password:string = "";

  constructor(private cdata:ConfigurationService){}

  login(usw: string, psw: string): void
  {
    if(this.password == psw){
      this.authenticated=true;
      localStorage.setItem('authToken', psw);
    }
    else{
      this.authenticated=false;
    }
  }

  logout(): void {
    this.authenticated = false;
    localStorage.removeItem('authToken');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    // Eğer token null, undefined veya boş bir dize ise, oturum geçerli değil
    if( token !== null && token !== undefined && token.trim() !== ''){
      this.authenticated = true;
    }
    else{
      this.authenticated = false;
    }
    return this.authenticated;
  }
  
  dataRefresh(){
    // getPass metodundan dönen Observable'ı abone olmak için kullanıyoruz
    this.cdata.getPass().subscribe(
      (result) => {
        this.password= result.value;
      },
      (error) => {
        console.error('Hata oluştu:', error);
      }
    );
  }


}
