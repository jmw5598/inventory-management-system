export class CreateUserDto {
  public username: string;
  public password: string;
  public isActive: boolean;
  public roles: string[]
}