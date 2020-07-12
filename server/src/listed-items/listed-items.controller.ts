import { Controller, UseFilters, UseGuards } from '@nestjs/common';
import { JwtAuthenticationGuard } from '../authentication/guards/jwt-authentication.guard';

@Controller('listed-items')
@UseGuards(JwtAuthenticationGuard)
export class ListedItemsController {}
