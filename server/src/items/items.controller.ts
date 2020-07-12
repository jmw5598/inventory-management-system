import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthenticationGuard } from '../authentication/guards/jwt-authentication.guard';

@Controller('items')
@UseGuards(JwtAuthenticationGuard)
export class ItemsController {}
