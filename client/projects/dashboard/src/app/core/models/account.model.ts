import { BaseModel } from './base.model';
import { Plan } from './plan.model';

export class Account extends BaseModel {
  public email: string;
  public isConfirmed: boolean;
  public plan: Plan;
}
