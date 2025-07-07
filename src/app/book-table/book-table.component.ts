import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { EditDialogBoxComponent } from '../edit-dialog-box/edit-dialog-box.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  standalone: true,
  selector: 'app-book-table',
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, CommonModule, EditDialogBoxComponent],
  templateUrl: './book-table.component.html',
  styleUrl: './book-table.component.css'
})
export class BookTableComponent {
  bookingData: any = {};
  showDialog = false;
  bookTableForm: FormGroup;
  emailForm: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient, private toastr: ToastrService) {
    this.bookTableForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      date: ['', Validators.required],
      time: ['', Validators.required],
      peopleCount: ['', [Validators.required, Validators.min(1)]],
      inbox: ['', [Validators.required, Validators.maxLength(500)]]
    });

    this.emailForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['Message from Hotel Taj', Validators.required],
      message: ['Your booking has been registered successfully.Please be on time.', Validators.required]
    });
  }

  saveBooking() {
    this.toastr.success('Booking saved successfuly!', 'Success');
    this.sendEmail();
  }

  sendEmail() {
    this.emailForm.patchValue({
      name:this.bookingData.name,
      email: this.bookingData.email
    });
    if (this.emailForm.valid) {
      this.http.post('http://localhost:3000/send-email', this.emailForm.value).subscribe({
        next: (res) => alert('Email sent successfully'),
        error: (err) => alert('Failed to send email')
      });
    }
  }

  bookTableFn() {
    console.log("************clicked");
    const apiUrl = "http://localhost:3000/api/bookings";

    if (this.bookTableForm.valid) {
      console.log(this.bookTableForm.value);
      const formData = this.bookTableForm.value;

      this.http.post(apiUrl, formData).subscribe({
        next: (response) => {
          console.log("API response*********", response);
          this.bookingData = formData;
          this.showDialog = true;// open child component
          
          // this.saveBooking();
        },
        error: (error) => {
          console.error('Error occured while submitting the form:********', error);
          this.toastr.error('Something went wrong while saving the booking.', 'Error');
        },
        complete: () => {
          this.bookTableForm.reset();
        }
      });
    }
    else {
      console.log('Form not valid');
    }
    this.bookTableForm.markAllAsTouched();
  }

  handleDialogClose(event: { isConfirmed: boolean; data?: any }) {
    this.showDialog = false;
    console.log("Dialog closed with data:", event);

    if (event.isConfirmed && event.data) {
      const apiUrl = `http://localhost:3000/api/bookings/${event.data.email}`;
      console.log("User updated the booking:", event.data);

      this.http.put(apiUrl, event.data).subscribe({
        next: (response) => {
          console.log("Data updated successfully:", event.data);
          this.saveBooking();
        },
        error: (error) => {
          console.error("Error updating booking:", error);
          this.toastr.error('Something went wrong while updating the booking.', 'Error');
        }
      });
    } else {
      console.log("User cancelled the dialog or no data was provided.");
    }
  }

}
