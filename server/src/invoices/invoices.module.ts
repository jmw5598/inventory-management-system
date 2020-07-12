import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Invoice } from './entities/invoice.entity';
import { InvoicesController } from './invoices.controller';

@Module({
  controllers: [
    InvoicesController
  ],
  imports: [
    TypeOrmModule.forFeature([Invoice])
  ]
})
export class InvoicesModule {}
