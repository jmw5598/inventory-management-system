import { NotFoundException } from '@nestjs/common';

export class ProfileNotFoundException extends NotFoundException {
  constructor() {
    super('Profile not foudn with the supplied id!');
  }
}
