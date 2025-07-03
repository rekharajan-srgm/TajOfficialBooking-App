import { Component, Input } from '@angular/core';
import { RouterOutlet, Router, RouterModule } from '@angular/router';
import { AuthService } from './services/authentication/auth.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  hideButtons$!: Observable<boolean>;
  title = 'TajOfficialBooking-App';
  constructor(public authService: AuthService, private router: Router) {
    
  }

  ngOnInit() {
    this.hideButtons$ = this.authService.hideButtons$;
    console.log("hideButton Valueeeeeeeee:",this.hideButtons$);
  }

  logout() {
    this.authService.logout();
    console.log("loggggg out clicked!");
    this.router.navigate(['/adminLogin']);
  }
}
