import { NotFoundException } from '@nestjs/common';

export class StockroomNotFoundException extends NotFoundException {
  constructor() {
    super(`Unable to find stockroom with supplied id.`);
  }
}
