import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { PaginatedMetaDto } from "../../../shared/dto/paginated.dto";

export class CreateClientDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    email: string|null;

    @ApiProperty()
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    phone: string|null;

    @ApiProperty()
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    address: string|null;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    balance: number;
}

export class DefaultClientResponse extends CreateClientDto{
    @ApiProperty()
    id: number

    @ApiProperty()
    createdAt: Date

    @ApiProperty()
    updatedAt: Date;
}

export class PaginatedClientsResponse {

    @ApiProperty({
        type: PaginatedMetaDto
    })
    meta: any
    @ApiProperty({
        type: DefaultClientResponse,
        isArray: true
    })
    data: DefaultClientResponse[]
}