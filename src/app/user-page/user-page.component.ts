import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-user-page',
  imports: [],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent {

  constructor(private http:HttpClient){

  }
  onFileSelected(event: Event) {
    console.log("inside file function");
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (file.type === 'text/plain') {
        const reader = new FileReader();
        reader.onload = () => {
          const fileContent = reader.result as string;
          console.log('File content:', fileContent);
          alert('Uploaded file content:\n' + fileContent);
          //send file to backend via api here
        };
        reader.readAsText(file);
      }
      else {
        alert('Please upload a valid .txt (Notepad) file.');
      }
    }
  }

  // downloadMenu(){
  //   console.log("am here");
  //   const a= document.createElement('a');
  //   a.href='assets/files/Book1.xlsx';
  //   a.download='Book1.xlsx';
  //   a.click();
  // }

  downloadMenu(){
    console.log("am inside download api");
this.http.get('http://localhost:3000/api/menu/download',{
  responseType:'blob'
}).subscribe({
  next: (data:Blob) => {
    const blob=new Blob([data],{
      type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    const url=window.URL.createObjectURL(blob);
    const a=document.createElement('a');
    a.href=url;
    a.download='Book1.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
    console.log('Menu downloaded:', data);
  },
  error: (err) => {
    // handle error here
    console.error('Download failed:', err);
  }
});
  }
}
