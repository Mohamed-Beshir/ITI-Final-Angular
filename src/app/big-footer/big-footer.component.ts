import { Component } from '@angular/core';
import { SmallFooterComponent } from '../small-footer/small-footer.component';

@Component({
  selector: 'app-big-footer',
  standalone: true,
  imports: [SmallFooterComponent],
  templateUrl: './big-footer.component.html',
  styleUrl: './big-footer.component.css'
})
export class BigFooterComponent {

}
