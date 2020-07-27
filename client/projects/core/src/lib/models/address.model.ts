import { BaseModel } from './base.model';

export class Address extends BaseModel {
  public street: string;
  public street2: string;
  public city: string;
  public state: string;
  public zip: string;
}
