import { NotFoundException } from '@nestjs/common';

export class ProductItemNotFoundException extends NotFoundException {
  constructor() {
    super(`Product item not found.`);
  }
}
