import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Account } from '../entities/account.entity';
import { Address } from '../entities/address.entity';
import { EmailerService } from '../../common/services/emailer/emailer.service';
import { Profile } from '../entities/profile.entity';
import { User } from '../../users/entities/user.entity';
import { Role } from '../../users/entities/role.entity';
import { RoleType } from '../../users/enums/role-type.enum';
import { RegistrationDto } from '../dtos/registration.dto';
import { CreateAccountDto } from '../dtos/create-account.dto';
import { CreateAddressDto } from '../dtos/create-address.dto';
import { CreateProfileDto } from '../dtos/create-profile.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { RegistrationResult } from '../dtos/registration-result.dto';
import { ResponseMessage } from 'src/common/models/response-message.model';
import { ResponseStatus } from 'src/common/enums/response-status.enum';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly _accountRepository: Repository<Account>,
    @InjectRepository(Address)
    private readonly _addressRepository: Repository<Address>,
    @InjectRepository(Profile)
    private readonly _profileRepository: Repository<Profile>,
    @InjectRepository(Role)
    private readonly _roleRepository: Repository<Role>,
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
    private readonly _emailerService: EmailerService 
  ) {}

  public async registerNewAccount(registrationDto: RegistrationDto): Promise<any> {    
    const account: Account = await this._createNewAccount(registrationDto.account);
    const user: User = await this._createNewUser(registrationDto.user, account);
    const profile: Profile = await this._createNewProfile(registrationDto.profile, account);
    this._emailerService.sendConfirmationEmail(profile.email, account.comfirmationToken);
    return {
      status: "SUCCESS",
      message: "Registration was success.  Please check and confirm your email address."
    } as RegistrationResult;
  }

  public async confirmAccount(code: string): Promise<ResponseMessage> {
    const account: Account = await this._accountRepository.findOne({ comfirmationToken: code });
    if (!account) throw new NotFoundException();
    account.isConfirmed = true;
    this._accountRepository.save(account);
    return {
      status: ResponseStatus.SUCCESS,
      message: `You successfully confirmed your email!`
    } as ResponseMessage;
  }

  public async doesEmailExist(email: string): Promise<boolean> {
    return this._profileRepository.count({ where: { email: email.trim().toLowerCase() }})
      .then(count => count > 0);
  }

  public async doesUsernameExist(username: string): Promise<boolean> {
    return this._userRepository.count({ where: { username: username.trim().toLowerCase() }})
      .then(count => count > 0);
  }

  private async _createNewAddress(createAddressDto: CreateAddressDto): Promise<Address> {
    const address: Address = this._addressRepository.create({
      street: createAddressDto.street,
      street2: createAddressDto.street2,
      city: createAddressDto.city,
      state: createAddressDto.state,
      zip: createAddressDto.zip
    });
    return this._addressRepository.save(address);
  }

  private async _createNewProfile(createProfileDto: CreateProfileDto, account: Account): Promise<Profile> {
    const address: Address = await this._createNewAddress(createProfileDto.address);
    const profile: Profile = this._profileRepository.create({
      firstName: createProfileDto.firstName,
      lastName: createProfileDto.lastName,
      email: createProfileDto.email.trim().toLowerCase(),
      address: address,
      account: { id: account.id }
    });
    return this._profileRepository.save(profile);
  }

  private async _createNewAccount(createAccountDto: CreateAccountDto): Promise<Account> {
    const account: Account = this._accountRepository.create({
      plan: createAccountDto.plan
    });
    return this._accountRepository.save(account);
  }

  private async _createNewUser(createUserDto: CreateUserDto, account: Account): Promise<User> {
    const userRole: Role = await this._roleRepository.findOne({ name: RoleType.USER });
    const user: User = this._userRepository.create({
      username: createUserDto.username.trim().toLowerCase(),
      password: this._hashPassword(createUserDto.password),
      account: { id: account.id },
      roles: [userRole]
    });  
    return this._userRepository.save(user);
  }

  private _hashPassword(password: string): string {
    return bcrypt.hashSync(password, 6);
  }
}
