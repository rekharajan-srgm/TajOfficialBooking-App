import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedOut:boolean=false;
  constructor() { }
login(){
this.loggedOut=true;
}
logout(){
this.loggedOut=false;
}
}
