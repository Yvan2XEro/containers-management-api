import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNumber, IsOptional, IsString } from "class-validator"
import { DefaultTransactionResponse } from "../../../modules/transactions/dto/create-transaction.dto"
import { Transaction } from "../../../modules/transactions/entities/transaction.entity"
import { PaginatedMetaDto } from "../../../shared/dto/paginated.dto"

export class CreateChargeDto {

    @ApiProperty()
    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional()
    extraCoastAmount: number

    @ApiPropertyOptional()
    @ApiProperty()
    @IsOptional()
    description: string|null

    @ApiProperty()
    @IsString()
    number: string

    @ApiProperty()
    @IsNumber()
    capacity: number

    @ApiProperty()
    @IsNumber()
    weigth: number

    @ApiProperty()
    @IsNumber()
    maxWeigth: number
    
    @ApiProperty()
    @IsString()
    type: string


    @ApiProperty({
        type: Number
    })
    @IsNumber()
    transaction: Transaction|null

}

export class DefaultChargeResponse extends CreateChargeDto {
    @ApiProperty()
    id: number

    @ApiProperty()
    createdAt: Date

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty({
        type: DefaultTransactionResponse
    })
    transaction: Transaction
}

export class PaginatedChargesResponse {

    @ApiProperty({
        type: PaginatedMetaDto
    })
    meta: any
    @ApiProperty({
        type: DefaultChargeResponse,
        isArray: true
    })
    data: DefaultChargeResponse[]
}