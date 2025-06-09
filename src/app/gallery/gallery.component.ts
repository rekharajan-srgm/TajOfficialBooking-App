import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-gallery',
  standalone:true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {
  food_images:boolean=false;
  ambience_images:boolean=false;

  showFoodImages(){
    console.log("foodieeeeeeeeee");
    this.food_images = true;
    this.ambience_images = false;
  }

   showAmbienceImages() {
    console.log("ambinenceeeeeee");
    this.ambience_images = true;
    this.food_images = false;
  }
}
