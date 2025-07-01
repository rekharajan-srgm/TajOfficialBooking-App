import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/authentication/auth.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {
  n: number = 1;
  customersPerPage: any = [];
  currentPage = 1;
  pageSize = 5;

  constructor(private http: HttpClient, private authService: AuthService) {

  }

  customers: any = [
    // { name: 'John Doe', email: 'john@example.com', date: '2025-06-01', time: '18:00', peopleCount: 4 },
    // { name: 'Jane Smith', email: 'jane@example.com', date: '2025-06-03', time: '20:00', peopleCount: 2 },
    // { name: 'David Johnson', email: 'david@example.com', date: '2025-06-04', time: '19:30', peopleCount: 3 }
  ];

  cust: any = [];
  ngOnInit() {
    this.getCustomerDetails();
  }

  getCustomerDetails() {
    // this.authService.hideButtons=true;
    if (typeof window !== 'undefined' && localStorage) {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
      const apiURL = "http://localhost:3000/api/bookings";
      this.http.get(apiURL, { headers }).subscribe({
        next: (res:any) => {
          this.customers = [];
          this.cust = [];
          for (let i = 0; i < res.length; i++) {
            const original = res[i];
            const copy = { ...original }; // create a shallow copy of the object
            this.customers.push(copy);
            this.cust.push(original); // second copy for cust
          }

          this.customers.forEach((data: any) => {
            const dateOfBooking = new Date(data.date);
            data.date = dateOfBooking.toLocaleDateString();
          });

          this.customersPerPage = this.customers.slice(0, this.pageSize);
        },
        error: (err) => {
          console.log('API error', err);
        },
        complete: () => {
        }

      });
    }
  }

  get totalPages(): number {
    return Math.ceil(this.customers.length / this.pageSize)
  }


  updatePage() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.customersPerPage = this.customers.slice(start, end);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePage();
    }
  }

  nextPage() {
    console.log("next page");
    this.goToPage(this.currentPage + 1);
  }

  prevPage() {
    console.log("prev page");
    this.goToPage(this.currentPage - 1);
  }

  firstPage() {
    console.log("first page");
    this.goToPage(1);
  }

  lastPage() {
    console.log("last page");
    this.goToPage(this.totalPages);
  }

  delCustomer(email: string) {
    console.log("************************", email);
    this.removeCustomer(email);
  }

  removeCustomer(email: string) {
    console.log("************************", email);
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
    const apiURL = `http://localhost:3000/api/bookings/bookTable/${email}`;
    this.http.delete(apiURL, { headers }).subscribe({
      next: (res) => {
        console.error("deleted customer:", res);
        // Reload page after deletion
        window.location.reload();
      },
      error: (err) => {
        console.error("Error deleting customer:", err);
      }
    });
  }

  handleSelection(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    switch (value) {
      case 'count':
        this.OrderByCount();
        break;
      case 'date':
        this.OrderByDate();
        break;
      case 'alphabet':
        console.log(this.OrderByAphabet());

        break;
    }
  }

  OrderByAphabet() {
    let alphOrder: string[] = [];
    console.log("Clicked!!!!");
    alphOrder = this.customers.map((data: any) => {
      return data.name;
    });
    alphOrder.sort((a, b) => a.localeCompare(b));
    const result = alphOrder.map((name) => {
      return this.customers.find((cust: any) => cust.name === name);
    });
    this.customers = result;
    this.currentPage = 1;
    this.updatePage();
  }

  OrderByDate() {
    console.log("Clicked!!!!");
    let dateOrder: any = [];
    dateOrder = this.cust.map((data: any) => {
      const dateObj = new Date(data.date);
      return dateObj.getTime();
    });
    console.log("dates in milliseconds-", dateOrder);
    dateOrder.sort((a:any,b:any)=>a-b);
    console.log("dates in order-", dateOrder);
    dateOrder=dateOrder.map((date:any)=>{
      const dates=new Date(date);
      const localDate=dates.toLocaleDateString("en-IN");
      return localDate;
    })
    const results=dateOrder.map((date:any)=>{

      return this.customers.find((data:any)=>data.date === date);
    });
    // this.customers.sort((a:any,b:any)=>new Date(a.date).getTime() - new Date(b.date).getTime());
    this.customers=results;
    console.log("customers",this.customers);
    this.currentPage=1;
    this.updatePage();
   
  }

  OrderByCount() {
    console.log("Clicked!!!!");
    let countOrder: number[] = [];
    countOrder = this.customers.map((data: any) => {
      return data.peopleCount;
    });
    countOrder.sort((a: number, b: number) => a - b);
    const resulted = countOrder.map((count: number) => {
      return this.customers.find((data: any) => data.peopleCount === count)
    });
    this.customers = resulted;
    this.currentPage = 1;
    this.updatePage();
  }

}
