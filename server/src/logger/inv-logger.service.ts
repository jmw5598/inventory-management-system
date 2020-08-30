import { Injectable, Logger, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable({ scope: Scope.TRANSIENT })
export class InvLoggerService extends Logger {
  private readonly _ENV: string;

  constructor(private _configService: ConfigService) {
    super();
    this._ENV = this._configService.get('ENV').toLowerCase();
  }

  public error(message: string, trace: string): void {
    super.error(message, trace);
    if (this._ENV === 'prod') {
      // TODO - Persist error to database
    }
  }
  public warn(message: string): void {
    super.warn(message);
    if (this._ENV === 'prod') {
      // TODO - Persist warn to database
    }
  }
  public debug(message: string): void {
    super.debug(message);
    if (this._ENV === 'prod') {
      // TODO - Persist debug to database
    }
  }
  public verbose(message: string): void {
    super.debug(message);
    if (this._ENV === 'prod') {
      // TODO - Persist verbose to database
    }
  }
}
