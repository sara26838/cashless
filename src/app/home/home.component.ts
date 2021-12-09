import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit ,AfterViewInit {
  @ViewChild('loginbutton') login: ElementRef<HTMLElement>;
  @ViewChild('customerbutton') list: ElementRef<HTMLElement>;
  constructor() { }
  ngAfterViewInit(): void {
    let token=localStorage.getItem("token")
    if(token){
     this.login.nativeElement.style.display="none"
     this.list.nativeElement.style.display="block"
    }else{
      this.login.nativeElement.style.display="block"
      this.list.nativeElement.style.display="none"
    }
  }

  ngOnInit(): void {

  }

}
