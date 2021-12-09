import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { ListingComponent } from './listing/listing.component';
import { LoginComponent } from './login/login.component';



const routes: Routes = [{path:"",component:HomeComponent},{path:"login",component:LoginComponent},{path:"list",component:ListingComponent, canActivate:[AuthGuard]},{path:"list/:id",component:ListingComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
