import { Module } from '@nestjs/common';
import { InvLoggerService } from './inv-logger.service';

@Module({
  providers: [
    InvLoggerService
  ],
  exports: [
    InvLoggerService
  ]
})
export class LoggerModule {}
