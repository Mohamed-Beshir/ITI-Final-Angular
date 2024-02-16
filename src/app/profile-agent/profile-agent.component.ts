import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { BigFooterComponent } from '../big-footer/big-footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-agent',
  standalone: true,
  imports: [NavbarComponent, BigFooterComponent, RouterLink],
  templateUrl: './profile-agent.component.html',
  styleUrl: './profile-agent.component.css'
})
export class ProfileAgentComponent {

}
