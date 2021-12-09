import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ListingComponent } from './listing/listing.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HttpResponse, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthGuard} from './auth.guard'
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import {TokenInterceptorServiceInterceptor} from '../app/token-interceptor-service.interceptor'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ListingComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule,
  
  ],
  providers: [AuthGuard,{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorServiceInterceptor,
    multi:true
  }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
