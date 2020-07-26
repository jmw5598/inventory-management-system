import { BaseModel } from './base.model';
import { Location } from './location.model';

export class Stockroom extends BaseModel {
  public name: string;
  public description: string;
  public locations?: Location[];
}
