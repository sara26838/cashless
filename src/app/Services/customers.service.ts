import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Customers} from '../model/Customers'

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private customersUrl="https://reqres.in/api/users?page=1"
  private customer2sUrl="https://reqres.in/api/users?page="
  private userID="https://reqres.in/api/users"
  constructor(private http:HttpClient) { }

  getUsers() :Observable<any>{
  //  return this.http.post<any>(this.loginUrl,user)
  return this.http.get<Customers[]>(this.userID)

}
getUsers2(id) :Observable<any>{
  //  return this.http.post<any>(this.loginUrl,user)
  return this.http.get<Customers[]>(this.customer2sUrl+id)

}

getCurrendUser(id) :Observable<any>{
  //  return this.http.post<any>(this.loginUrl,user)
  return this.http.get("https://reqres.in/api/users/"+id)

}
updateUser(id ,data) :Observable<any>{

  return this.http.put("https://reqres.in/api/users/"+id ,data)

}
delete(id) :Observable<any>{
  return this.http.delete("https://reqres.in/api/users/"+id)
}
}
