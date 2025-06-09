import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet,RouterModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  title = 'TajOfficialBooking-App';
  adminLogout = false;
  constructor(private authService: AuthService) {}
  ngOnInit(){
    this.adminLogout=this.authService.loggedIn;
  }
  logout(){
    this.authService.logout();
  }
}
