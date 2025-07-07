import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-email-form',
  imports: [],
  templateUrl: './email-form.component.html',
  styleUrl: './email-form.component.css'
})
export class EmailFormComponent {
  emailForm: FormGroup;
  constructor(private fb:FormBuilder,private http:HttpClient){
this.emailForm=this.fb.group({
name:['',Validators.required],
email:['',Validators.required,Validators.email],
subject:['Message from Hotel Taj',Validators.required],
message:['Your booking has been registered successfully.Please be on time.',Validators.required]
});
  }

  sendEmail(){
    if(this.emailForm.valid){
      this.http.post('http://localhost:3000/send-email',this.emailForm.value).subscribe({
        next:(res)=> alert('Email sent successfully'),
        error:(err)=>alert('Failed to send email')
      });
    }
  }
}
