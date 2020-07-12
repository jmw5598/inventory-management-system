import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthenticationGuard } from '../authentication/guards/jwt-authentication.guard';

@Controller('invoices')
@UseGuards(JwtAuthenticationGuard)
export class InvoicesController {}
