import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import{AuthserviceService} from '../Services/authservice.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup
  constructor(private _authService:AuthserviceService , private fb:FormBuilder , private router:Router) {
    this.loginForm=this.fb.group({
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required])
    })
   }
 
  ngOnInit(): void {
  }
  showErrorMessage:boolean=false
login(){
  console.log(this.loginForm.value)
  var user=this.loginForm.value
this._authService.loginUser(user).subscribe(data => 
  {console.log(data.token)
  localStorage.setItem("token",data.token)
  this.router.navigateByUrl("/list")
},
(error) => {
  this.showErrorMessage = true;
}
)
}
}
