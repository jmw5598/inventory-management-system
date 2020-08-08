import { IsNotEmpty } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty()
  public street: string;

  public street2: string;

  @IsNotEmpty()
  public city: string

  @IsNotEmpty()
  public state: string;

  @IsNotEmpty()
  public zip: string;
}
