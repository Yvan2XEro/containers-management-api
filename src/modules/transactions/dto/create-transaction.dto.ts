import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginatedMetaDto } from '../../../shared/dto/paginated.dto';

export class CreateTransactionDto {
  @IsDate()
  @IsOptional()
  @ApiPropertyOptional()
  @ApiProperty()
  departureDate: Date | null;

  @IsDate()
  @IsOptional()
  @ApiPropertyOptional()
  @ApiProperty()
  arrivalDate: Date | null;

  @IsEnum(['charging', 'in_transit', 'arrived', 'cancelled'])
  @IsOptional()
  @ApiPropertyOptional()
  @ApiProperty()
  status: 'charging' | 'in_transit' | 'arrived' | 'cancelled';

  @ApiProperty()
  @IsString()
  trackingNumber: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  departurePortName: string | null;
  
  @ApiProperty()
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  arrivalPortName: string | null;
}

export class DefaultTransactionResponse extends CreateTransactionDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class PaginatedTransactionsResponse {
  @ApiProperty({
    type: PaginatedMetaDto,
  })
  meta: any;
  @ApiProperty({
    type: DefaultTransactionResponse,
    isArray: true,
  })
  data: DefaultTransactionResponse[];
}
