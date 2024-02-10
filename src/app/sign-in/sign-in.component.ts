import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SmallFooterComponent } from '../small-footer/small-footer.component';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [NavbarComponent, SmallFooterComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

}
