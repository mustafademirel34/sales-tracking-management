import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit{

  constructor(
    private router: Router,
    private activatedRoute:ActivatedRoute
    ){}

    hatakodu:string='';
    hatamesaj:string='';
    hataaciklama:string='';

    ngOnInit(): void {
      this.activatedRoute.queryParams.subscribe(params => {
        if ('wha' in params) {
          this.hatakodu="500";
          this.hatamesaj="Internal Server Error";
          this.hataaciklama="Sunucu bağlantı hatası. Lütfen bu durumu acilen bildirin.";
        }
        else{
          this.hatakodu="404";
          this.hatamesaj="Page not found";
          this.hataaciklama="Aradığınız sayfa bulunamadı. Bu sayfaya erişim kapatılmış olabilir.";
        }
        
      });
    }

  returnToHome(){
    this.router.navigate(["home"], {});
  }

}
