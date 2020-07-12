import { BaseModel } from './base.model';
import { Address } from './address.model';

export class Profile extends BaseModel {  
  public firstName: string;
  public lastName: string;
  public email: string;
  public address: Address;
}
