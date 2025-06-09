import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  standalone:true,
  selector: 'app-admin-login',
  imports: [FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {

  username: string = '';
  password: string = '';
  changeLogout:boolean=false;
    
  constructor(private router: Router) { }
  login(usrname:string,pswrd:string) {
    console.log("Trying to log in");
    if(usrname==='admin123' && pswrd==='User@123'){
        console.log("successful log in!Admin!");
    this.router.navigate(['/adminPage']); 
    this.changeLogout=true;
    }
    else {
      console.log("wrong username/password",usrname,pswrd);
    }
  }
}
