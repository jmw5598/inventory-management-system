import { Component, OnInit, Input } from '@angular/core';
import { SpinnerSize } from './spinner-size.enum';

@Component({
  selector: 'inv-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  @Input()
  size: SpinnerSize;

  @Input()
  text: string;

  constructor() {
    this.size = SpinnerSize.MEDIUM;
  }

  ngOnInit(): void {
  }
}
