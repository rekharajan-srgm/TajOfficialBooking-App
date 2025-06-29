import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/authentication/auth.service';
@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {
  n: number = 1;
  constructor(private http: HttpClient,private authService:AuthService) {

  }
  customers: any = [
    // { name: 'John Doe', email: 'john@example.com', date: '2025-06-01', time: '18:00', peopleCount: 4 },
    // { name: 'Jane Smith', email: 'jane@example.com', date: '2025-06-03', time: '20:00', peopleCount: 2 },
    // { name: 'David Johnson', email: 'david@example.com', date: '2025-06-04', time: '19:30', peopleCount: 3 }
  ];
  ngOnInit() {
    this.getCustomerDetails();
  }
  getCustomerDetails() {
    // this.authService.hideButtons=true;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
     Authorization: `Bearer ${token}` 
    });
    const apiURL = "http://localhost:3000/api/bookings";
    this.http.get(apiURL,{ headers }).subscribe({
      next: (res) => {
        this.customers = res;
        console.log("********", this.customers);
      },
      error: (err) => {

      },
      complete: () => {

      }
    })
  }

  delCustomer(email: string) {
    console.log("************************", email);
    this.removeCustomer(email);
  }
  
  removeCustomer(email:string) {
    console.log("************************", email);
    const apiURL = `http://localhost:3000/api/bookings/bookTable/${email}`;
    this.http.delete(apiURL).subscribe({
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
}
