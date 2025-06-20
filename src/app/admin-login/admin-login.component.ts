import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/authentication/auth.service';
import { CommonModule } from '@angular/common';
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
  loginError:boolean=false;
    
  constructor(private router: Router, private authService:AuthService) { }

  login(usrname:string,pswrd:string) {
    console.log("Trying to log in");
    
    this.authService.login(usrname,pswrd);
    
  }
}
