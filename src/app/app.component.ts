import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
<<<<<<< HEAD
import { RegisterComponent } from './register/register.component';
=======
import { NavbarComponent } from './navbar/navbar.component';
import { BigFooterComponent } from './big-footer/big-footer.component';



>>>>>>> d96eb3889a0de516934cf534a330d0edd95fde3f

@Component({
  selector: 'app-root',
  standalone: true,
<<<<<<< HEAD
  imports: [RouterOutlet, RegisterComponent],
=======
  imports: [RouterOutlet, NavbarComponent, BigFooterComponent],
>>>>>>> d96eb3889a0de516934cf534a330d0edd95fde3f
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
}
