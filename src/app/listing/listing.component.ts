import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { startWith } from 'rxjs/operators';
import { Customers } from '../model/Customers';
import { CustomersService } from '../Services/customers.service';
let CACHE_KEY = 'httpRepoCache';
@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css'],
})
export class ListingComponent implements OnInit {
  @ViewChildren('name') name: QueryList<ElementRef>;
  @ViewChildren('job') job: QueryList<ElementRef>;
  @ViewChild('completeModal') completeModal: ElementRef;
  @ViewChild('updated') updated: ElementRef<HTMLElement>;

  first_name: any;
  p: number = 1;
  userEmail: any;
  userFirstname: any;
  userLastname: any;
  userImage: any;
  total: any;
  total_pages: any;

  constructor(
    private _customerService: CustomersService,
    private router: Router
  ) {}

  updateForm = new FormGroup({
    name: new FormControl(''),
    job: new FormControl(''),
  });
  customers: Customers[] = [];
  ngOnInit(): void {
    
    this._customerService.getUsers().subscribe((data) => {
      this.total_pages = data.total_pages;

      for (let i = 1; i <= this.total_pages; i++) {
        this._customerService.getUsers2(i).subscribe((response) => {
          var customerData = response.data;
          for (let j = 0; j < customerData.length; j++) {
            this.customers.push(customerData[j]);
            
          }
          localStorage.setItem(CACHE_KEY, JSON.stringify(this.customers.reverse));
          this._customerService
            .getUsers2(i)
            .pipe(startWith(JSON.parse(localStorage[CACHE_KEY] || '[]')));
        });
      }
    });
    if(localStorage.getItem(CACHE_KEY)){

      this.customers.reverse();
    }
  }
  Search() {
    if (this.first_name == '') {
      this.ngOnInit();
    } else {
      this.customers = this.customers.filter((res) => {
        return res.first_name
          .toLocaleLowerCase()
          .match(this.first_name.toLocaleLowerCase());
      });
    }
  }
  key = 'id';
  reverse: boolean = false;
  bn: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  update(e) {
    this._customerService
      .updateUser(e.target.id, this.updateForm.value)
      .subscribe((result) => {});
    this.name.forEach((firstName) => {
      if (e.target.id == firstName.nativeElement.id) {
        firstName.nativeElement.innerHTML = this.updateForm.controls.name.value;
      }
    });

    this.job.forEach((jobb) => {
      if (e.target.id == jobb.nativeElement.id) {
        jobb.nativeElement.innerHTML = this.updateForm.controls.job.value;
      }
    });
  }

  delete(e) {
    alert('Delete user ?');
    this._customerService.delete(e);
    for (let i = 0; i < this.customers.length; i++) {
      if (this.customers[i].id == e) {
        const index = i;
        this.customers.splice(index, 1);
      }
    }
  }
  getUser(e) {
    this.name.forEach((firstName) => {
      if (e == firstName.nativeElement.id) {
        this.updateForm = new FormGroup({
          name: new FormControl(firstName.nativeElement.innerHTML),
          job: new FormControl('nojob'),
        });
      }
    });

    this.job.forEach((jobb) => {
      if (e == jobb.nativeElement.id) {
        this.updateForm.controls['job'].setValue(jobb.nativeElement.innerHTML);
      }
    });
  }
  getUserDetails(id) {
    this._customerService.getCurrendUser(id).subscribe((details) => {
      this.userEmail = details.data.email;
      this.userFirstname = details.data.first_name;
      this.userLastname = details.data.last_name;
      this.userImage = details.data.avatar;
    });
  }
  trackby(index: number, customer: any): string {
    return customer.id;
  }
  LogOut() {
 localStorage.removeItem('token');

    this.router.navigateByUrl('/');
  }
}
