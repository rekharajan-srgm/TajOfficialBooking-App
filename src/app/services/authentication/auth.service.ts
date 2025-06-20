import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginResponse } from './loginResInterface';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedOut: boolean = false;
  // hideButtons:boolean=false;
  private hideButtonsSubject = new BehaviorSubject<boolean>(false); //creating object for behavioursubject
  hideButtons$ = this.hideButtonsSubject.asObservable();
  setHideButtons(value: boolean) {
    this.hideButtonsSubject.next(value);
  }
  get hideButtonsValue(): boolean {
    return this.hideButtonsSubject.value;
  }
  constructor(private http: HttpClient, private router: Router) { 

  }

  login(username: string, password: string) {
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
