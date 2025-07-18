import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/authentication/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@Component({
  standalone:true,
  selector: 'app-admin-login',
  imports: [FormsModule,CommonModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {

  username: string = '';
  password: string = '';
  emailId: string= '';
  otp: string= '';
  loginError:boolean=false;
  otpLogin:boolean =true;
    
  constructor(private router: Router, private authService:AuthService,private http:HttpClient) { }

  login(usrnameOrEmail: string, pswrdOrOtp: string | number) {
    if (typeof pswrdOrOtp === 'string') {
      // Username/password login
      console.log("Trying to log in");
      this.authService.login(usrnameOrEmail, pswrdOrOtp);
    } else {
      // Email/OTP login
      console.log("Trying to log in with OTP");
      this.authService.loginWithOtp(usrnameOrEmail, pswrdOrOtp);
    }
  }

  sendOtp(){
    console.log("get otpppp.............");
    // const phNumber=this.customer.filter;
    // this.http.post('http://localHost:4000/send-otp',{phNumber}).subscribe({
    //   next:()=>alert("Otp sent to mobile!"),
    //   error:()=>alert('Failed to send Otp')
    // });
  }
}
