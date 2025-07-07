import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginResponse } from './loginResInterface';
import { BehaviorSubject } from 'rxjs';
import { TokenExpiryService } from '../token-expiry/token-expiry.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  loggedOut: boolean = false;

  private hideButtonsSubject = new BehaviorSubject<boolean>(false); //creating object for behavioursubject
  hideButtons$ = this.hideButtonsSubject.asObservable();
  setHideButtons(value: boolean) {
    this.hideButtonsSubject.next(value);
  }
  get hideButtonsValue(): boolean {
    return this.hideButtonsSubject.value;
  }

  constructor(private http: HttpClient, private router: Router,private tokenExpiryService: TokenExpiryService) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      if (this.tokenExpiryService.isTokenExpired(token)) {
        // token is expired
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setHideButtons(false);
        this.router.navigate(["/adminLogin"]);
      } else {
        // token is still valid
        const expiryTime = this.tokenExpiryService.getTokenExpiration(token)! - Date.now();
        const isLoggedIn=sessionStorage.getItem('loggedIn');
        if(isLoggedIn=='true'){
           this.setHideButtons(true);
        }
        console.log("ExpiryTime for current valid token:::",expiryTime);
        console.log("loggedOut is:",sessionStorage.getItem('loggedIn'));
        setTimeout(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          this.setHideButtons(false);
         this.router.navigate(["/adminLogin"]);
        }, expiryTime); // Auto logout after remaining time
      }
    }
    else{
      this.setHideButtons(false); //no tokens, show buttons
    }
  }

  login(username: string, password: string) {
    sessionStorage.setItem('loggedIn','true');
    this.loggedOut = true;
    const apiURL = "http://localhost:3000/api/auth/login";
    this.http.post<LoginResponse>(apiURL, { username, password }).subscribe({
      next: (response) => {
        if (response && response.token) {
          console.log("response-------:", response);
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user))
          if (typeof window !== 'undefined' && localStorage.getItem('token')) {
            this.router.navigate(['/adminPage']);
            this.setHideButtons(true);// to hide buttons

          }
          else {
            this.router.navigate(['/login']);
            alert("error occured while login");
          }
          //  window.open('/adminPage','_blank');
        }
        else {
          console.log("Token not found in response");
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
        alert("Invalid login credentials.");
      },
      complete: () => {

      }
    });
  }

  logout() {
    sessionStorage.setItem('loggedIn','false');
    this.loggedOut = false;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setHideButtons(false); // to show buttons
    this.router.navigate(['/login']);
  }

  // isLoggedIn():boolean {
  //   return !!localStorage.getItem('token');
  // }
  //in app.component
  //   if (this.authService.isLoggedIn()) {
  //   this.router.navigate(['/admin']);
  // }

}

//autoLogout logic for safe