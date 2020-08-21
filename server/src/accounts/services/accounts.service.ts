import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Raw } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

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
import { UpdateAccountDto } from '../dtos/update-account.dto';
import { UpdateProfileDto } from '../dtos/update-profile.dto';
import { AccountNotFoundException } from '../exceptions/account-not-found.exception';

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

  public async getAccountDetails(accountId: number): Promise<Partial<Account>> {
    const account: Account = await this._accountRepository.findOne({
      relations: ['plan'],
      where: { account: { id: accountId } }
    });
    const { comfirmationToken, ...result } = account;
    return result;
  }

  public async updateAccountDetails(accountId: number, updateAccountDto: UpdateAccountDto): Promise<Account> {
    const account: Account = await this._accountRepository.findOne(accountId);
    if (!account) throw new AccountNotFoundException();
    account.plan = updateAccountDto.plan;
    const { comfirmationToken, ...result } = await this._accountRepository.save(account);
    return result as Account;
  }

  public async getAccountProfile(accountId: number): Promise<Profile> {
    return this._profileRepository.findOne({
      relations: ['address'],
      where: { account: { id: accountId } }
    });
  }

  public async updateAccountProfile(accountId: number, updateProfileDto: UpdateProfileDto): Promise<Profile> {
    const profile: Profile = await this._profileRepository.findOne({ 
      relations: ['address'],
      where: { account: { id: accountId } }
    });
    profile.firstName = updateProfileDto.firstName;
    profile.lastName = updateProfileDto.lastName;
    profile.address.street = updateProfileDto.address.street;
    profile.address.street2 = updateProfileDto.address.street2;
    profile.address.city = updateProfileDto.address.city ;
    profile.address.state = updateProfileDto.address.state;
    profile.address.zip = updateProfileDto.address.zip;
    this._profileRepository.save(profile);
    this._addressRepository.save(profile.address);
    return profile;
  }

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
      message: `Email successfully confirmed!`
    } as ResponseMessage;
  }

  public async passwordResetFromResetToken(password: string, resetToken: string): Promise<ResponseMessage> {
    const user: User = await this._userRepository.findOne({ 
      where: { 
        resetToken: resetToken,
            resetTokenExpiration: Raw(alias =>`${alias} > NOW()`)
      } 
    });
    
    if (!user) {
      return { status: ResponseStatus.ERROR, message: `Invalid or expired reset code.` };
    }

    user.password = this._hashPassword(password);
    user.resetToken = uuidv4();
    this._userRepository.save(user);
    
    return {
      status: ResponseStatus.SUCCESS,
      message: `Your password was successfully changed!`
    } as ResponseMessage
  }

  public async passwordRequestReset(email: string): Promise<ResponseMessage> {
    const profile: Profile = await this._profileRepository.findOne({ 
      relations: ['account'],
      where: { email: email } 
    });

    if (profile) {
      const user: User = await this._userRepository.findOne({ account: { id: profile.account.id } });
      user.resetToken = uuidv4();
      user.resetTokenExpiration = this._generateResetTokenExpiration();
      this._userRepository.save(user);
      this._emailerService.sendPasswordResetEmail(email, user.resetToken);
    }

    return {
      status: ResponseStatus.SUCCESS,
      message: `You should receive an email with a reset link shortly!`
    } as ResponseMessage
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
    const resetTokenExpiration: Date = this._generateResetTokenExpiration();
    const user: User = this._userRepository.create({
      username: createUserDto.username.trim().toLowerCase(),
      password: this._hashPassword(createUserDto.password),
      account: { id: account.id },
      resetToken: uuidv4(),
      resetTokenExpiration: resetTokenExpiration,
      roles: [userRole]
    });  
    return this._userRepository.save(user);
  }

  private _generateResetTokenExpiration(): Date {
    const now: Date = new Date();
    now.setMinutes(now.getMinutes() + 10);
    return now;
  }

  private _hashPassword(password: string): string {
    return bcrypt.hashSync(password, 6);
  }
}
