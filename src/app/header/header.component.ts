import { Component } from '@angular/core';
import { SearchfieldComponent } from './searchfield/searchfield.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    SearchfieldComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
