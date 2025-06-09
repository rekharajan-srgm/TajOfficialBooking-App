import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ContactComponent } from './contact/contact.component';
import { BookTableComponent } from './book-table/book-table.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'about',component:AboutComponent},
    {path:'menu',component:MenuComponent},
    {path:'gallery',component:GalleryComponent},
    {path:'contact',component:ContactComponent},
    {path:'bookTable',component:BookTableComponent},
    {path:'adminPage',component:AdminPageComponent},
    {path:'adminLogin',component:AdminLoginComponent}
];
