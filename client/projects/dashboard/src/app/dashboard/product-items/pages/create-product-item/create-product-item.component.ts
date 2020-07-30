import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'inv-create-product-item',
  templateUrl: './create-product-item.component.html',
  styleUrls: ['./create-product-item.component.scss']
})
export class CreateProductItemComponent implements OnInit {

  public form: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
