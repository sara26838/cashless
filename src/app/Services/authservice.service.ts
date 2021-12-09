import { Injectable , Injector} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  private loginUrl="https://reqres.in/api/login"
  constructor(private http:HttpClient) { }
  showErrorMessage = false;
  loginUser(user):Observable<any>{
  //  return this.http.post<any>(this.loginUrl,user)
  return this.http.post<any>(this.loginUrl,user)
  
}

loggedIn(){
  return  !!localStorage.getItem('token')
}
getToken(){
  localStorage.getItem('token')
}
}
