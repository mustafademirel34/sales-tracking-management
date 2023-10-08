import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ActionComponent } from './action/action.component';
import { PrintComponent } from './print/print.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { StockComponent } from './stock/stock.component';
import { NotFoundComponent } from './not-found/not-found.component';

//ng generate module app-routing --flat --module=app
//module dosyamı ben oluşturdum :D
//burada yönlendirmeler sabitte tutulur
const routes: Routes = [
  { path: '', component: AuthComponent, canActivate : [AuthGuardService]},
  { path: 'home', component: HomeComponent , canActivate : [AuthGuardService]},
  { path: 'home/all', component: HomeComponent , canActivate : [AuthGuardService]},
  { path: 'action', component: ActionComponent , canActivate : [AuthGuardService]},
  { path: 'stock', component: StockComponent, canActivate : [AuthGuardService]},
  { path: 'print', component: PrintComponent, canActivate : [AuthGuardService]},
  { path: 'login', component: AuthComponent},
  { path: 'not-found', component: NotFoundComponent},

  // Yönlendirme düzenlemesi burada
  { path: '**', component: NotFoundComponent }, // Bu satır, tanımlanan tüm yol eşleşmeleri dışındaki tüm yolları PageNotFoundComponent ile eşleştirir
]
//burada routelar import edilir
//edildiği için router-outlet artık kullanılır haldedir
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

//dosyasınn varlığı bu
export class AppRoutingModule { }
