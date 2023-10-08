import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthCheckService } from '../services/auth/auth-check.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

   // İŞLEMLER BACKEND'DE OLACAĞINDAN, SİSTEME API ÜZERİNDEN GİRİŞ YAPILMASI GEREKMEKTEDİR.
  constructor(private router:Router,private auth:AuthCheckService) { }

  ngOnInit(): void {

    this.auth.dataRefresh();

    if(this.auth.isAuthenticated())
    {
      this.router.navigate(['home']);
    }

  }

  password:string='';

  login(){
    
    this.auth.login("nothing",this.password);

    if(this.auth.isAuthenticated())
    {
      this.auth.authenticated=true;
      this.router.navigate(['home']);
    }else{
      console.log("şifre yanlış")
      alert("Şifre hatalı, lütfen tekrar deneyin. Bir sorun olduğunu düşünüyorsanız bildiriniz.")
    }

  }


}

