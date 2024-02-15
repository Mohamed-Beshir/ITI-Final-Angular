import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { BigFooterComponent } from '../big-footer/big-footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-myproperties-agent',
  standalone: true,
  imports: [NavbarComponent, BigFooterComponent, RouterLink],
  templateUrl: './myproperties-agent.component.html',
  styleUrl: './myproperties-agent.component.css'
})
export class MypropertiesAgentComponent {

}
