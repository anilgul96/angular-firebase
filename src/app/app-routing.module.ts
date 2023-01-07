import { InterfaceComponent } from './components/interface/interface.component';
import { IlanDetayComponent } from './components/ilan-detay/ilan-detay.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './components/category/category.component';
import { IlanlarComponent } from './components/ilanlar/ilanlar.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from 'src/service/auth.guard';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  {
    path: "kategoriler",
    component: CategoryComponent,
  },
  { path: "ilanlar", component: IlanlarComponent },
  { path: "ilanDetay/:id", component: IlanDetayComponent },
  { path: "giris", component: LoginComponent },

  
  {
    path: "anasayfa",
    component: HomeComponent,
  },
  {
    path: "",
    component: InterfaceComponent,
  },
  {
    path: "interface",
    component: InterfaceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
