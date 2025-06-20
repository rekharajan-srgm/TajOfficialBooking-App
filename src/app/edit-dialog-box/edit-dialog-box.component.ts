import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  standalone: true,
  selector: 'app-edit-dialog-box',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-dialog-box.component.html',
  styleUrl: './edit-dialog-box.component.css'
})
export class EditDialogBoxComponent {
  @Input() bookingDetails: any;
  @Output() onClose = new EventEmitter<{isConfirmed: boolean; data?:any}>();
  isEditing = false;
  editableBooking: any = {};
 
  ngOnChanges(changes: SimpleChanges) {
    console.log("receieved booking details:", this.bookingDetails);
    if (changes['bookingDetails'] && changes['bookingDetails'].currentValue) {
      this.editableBooking = { ...this.bookingDetails };
    }
  }
  confirm() {
    this.onClose.emit({isConfirmed:true,data:this.editableBooking});
    console.log("bookingDetails", this.bookingDetails);
  }
  cancel() {
    this.onClose.emit({isConfirmed:false});
  }

  editBookedTable() {
    console.log("here in editing state........");
    this.isEditing = true;
    console.log("Updated details:", this.editableBooking);
  }

  saveEditedDetails() {
    this.isEditing = false;
    console.log("Updated Details:", this.editableBooking);
    this.onClose.emit({isConfirmed:true,data:this.editableBooking});
  }

}
