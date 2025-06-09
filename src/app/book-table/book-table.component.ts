import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@Component({
  standalone: true,
  selector: 'app-book-table',
  imports: [ReactiveFormsModule,FormsModule,HttpClientModule,CommonModule],
  templateUrl: './book-table.component.html',
  styleUrl: './book-table.component.css'
})
export class BookTableComponent {
  bookTableForm: FormGroup;
  constructor(private fb:FormBuilder,private http:HttpClient){
  this.bookTableForm=this.fb.group({
    name:['',[Validators.required, Validators.minLength(2)]],
    email:['', [Validators.required,Validators.email]],
    phone:['',[Validators.required, Validators.pattern('^[0-9]{10}$')]],
    date:['',Validators.required],
    time:['',Validators.required],
    peopleCount:['',[Validators.required, Validators.min(1)]],
    inbox:['',[Validators.required,Validators.maxLength(500)]]
  });
  }
bookTableFn(){
  console.log("************clicked");
  const formData=this.bookTableForm.value;
  const apiUrl="http://localhost:3000/api/bookTable";
  if(this.bookTableForm.valid){
    console.log(this.bookTableForm.value);
    // this.bookTableForm.reset();
    this.http.post(apiUrl, formData ).subscribe({next:(response)=>{
      console.log("API response",response);
      
    },
    error:(error)=>{
      console.error('Error occured while submitting the form:',error);
    },
    complete:()=>{
    this.bookTableForm.reset();
    }
    });
    
  }
  else{
    console.log('Form not valid');
  }
  this.bookTableForm.markAllAsTouched();
}
}
