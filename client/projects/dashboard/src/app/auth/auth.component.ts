import { Component } from '@angular/core';
import { fadeAnimation } from '@dashboard/shared/animations';

@Component({
  selector: 'inv-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [fadeAnimation]
})
export class AuthComponent { }
