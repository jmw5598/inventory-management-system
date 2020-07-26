import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthenticationGuard } from '../authentication/guards/jwt-authentication.guard';

@Controller('product-items')
@UseGuards(JwtAuthenticationGuard)
export class ProductItemsController {}
