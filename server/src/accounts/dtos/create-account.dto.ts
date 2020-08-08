import { IsNotEmpty, IsEmail } from 'class-validator';
import { Plan } from '../../plans/entities/plan.entity';

export class CreateAccountDto {
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  public username: string;

  @IsNotEmpty()
  public password: string;

  @IsNotEmpty()
  public plan: Plan;
}