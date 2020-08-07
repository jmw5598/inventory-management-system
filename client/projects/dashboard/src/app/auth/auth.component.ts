import { Component } from '@angular/core';
import { fadeAnimation } from '../shared/animations/fade-in-out.animation';

@Component({
  selector: 'inv-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [fadeAnimation]
})
export class AuthComponent { }
