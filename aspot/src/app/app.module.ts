import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ActionComponent } from './action/action.component';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { ModalComponent } from './modal/modal.component';
import { PrintComponent } from './print/print.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ChunkPipe } from './pipes/chunk.pipe';
import { BsModalService } from 'ngx-bootstrap/modal';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LimitToMaxDirective } from './services/helper/limit-max-directive';
import { DatePipe } from '@angular/common';
import { CustomerService } from './services/api/customer.service';
import { DeliveryService } from './services/api/delivery.service';
import { StockComponent } from './stock/stock.component';
import { AuthComponent } from './auth/auth.component';
import { ConfigurationService } from './services/api/configuration.service';
import { ApiErrorInterceptor } from './services/api/ApiErrorInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ActionComponent,
    CustomDatePipe,
    ModalComponent,
    PrintComponent,
    ChunkPipe,
    LimitToMaxDirective,
    StockComponent,
    AuthComponent
  ],
  imports: [
    //RouterModule.forRoot([]) Roter Outlet için ancak App Routing Module oluşturduğumuz için gerek kalmadı
    //olmazsa hata veriyor
    BrowserModule,
    HttpClientModule,
    FormsModule,//select vs için ngmodel yapısı sunar
    AppRoutingModule,
    DragDropModule,
    ReactiveFormsModule
  ],
  providers: [//özelde çalıştığımız her şeyi eklicez galiba
    BsModalService,
    DatePipe,//bunun yeri burasıymış aq
    CustomDatePipe,
    CustomerService,
    DeliveryService,
    PrintComponent,
    ModalComponent,

    { provide: HTTP_INTERCEPTORS, useClass: ApiErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  // constructor(private cc:ConfigurationService){
  //   this.cc.fetchApiData();
  // }
}
