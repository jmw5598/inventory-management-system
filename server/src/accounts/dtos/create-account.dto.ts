import { IsNotEmpty, IsEmail } from 'class-validator';
import { Plan } from '../../plans/entities/plan.entity';

export class CreateAccountDto {
  @IsNotEmpty()
  public plan: Plan;
}