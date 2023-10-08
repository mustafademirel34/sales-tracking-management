import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Configuration } from './model/Configuration';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './services/api/api.service';
import { ConfigurationService } from './services/api/configuration.service';
import { AuthCheckService } from './services/auth/auth-check.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{



  //AKDJASLKDJASLDJAKLSDA BAK BAK BAK BAK BAK BAK BAK BAK BAK BAK BAK BAK BAK BAK BAK BAK BAK BAK BAK BAK BAK BAK BAK BAK BAK BAK BAK BAK BAK BAK
  // BAK BAK BAK BAK BAK BAK BAK BAK BAK BAK BAK BAK BAK BAK BAK BAK BAK BAK BAK BAK BAK BAK BAK BAK BAK BAK BAK BAK BAK BAK BAK BAK BAK BAK BAK BAK BAK BAK BAK

  title = 'Saygın Mobilya';

  constructor(private cc:ConfigurationService,private auth:AuthCheckService) {}

  ngOnInit() {
    //Şifre okuma veritabanından sağlanır
    this.auth.dataRefresh();
    
  }


}
