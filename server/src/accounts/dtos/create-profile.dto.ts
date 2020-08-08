import { IsNotEmpty, IsEmail } from 'class-validator';
import { CreateAddressDto } from './create-address.dto';

export class CreateProfileDto {
  @IsNotEmpty()
  public firstName: string;

  @IsNotEmpty()
  public lastName: string;

  @IsEmail()
  public email: string;

  @IsNotEmpty()
  public address: CreateAddressDto;
}