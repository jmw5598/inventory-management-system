import { IsNotEmpty } from 'class-validator';
import { UpdateAddressDto } from './update-address.dto';

export class UpdateProfileDto {
  @IsNotEmpty()
  public firstName: string;

  @IsNotEmpty()
  public lastName: string;

  @IsNotEmpty()
  public address: UpdateAddressDto;
}
