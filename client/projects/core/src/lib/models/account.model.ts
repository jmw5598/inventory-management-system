import { BaseModel } from './base.model';
import { Plan } from './plan.model';

export class Account extends BaseModel {
  public isConfirmed: boolean;
  public plan: Plan;
}
