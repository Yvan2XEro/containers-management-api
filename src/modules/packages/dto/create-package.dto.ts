import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsDate, IsEnum, IsNumber, IsOptional, IsString } from "class-validator"
import { DefaultChargeResponse } from "src/modules/charges/dto/create-charge.dto"
import { Charge } from "src/modules/charges/entities/charge.entity"
import { DefaultClientResponse } from "src/modules/clients/dto/create-client.dto"
import { Client } from "src/modules/clients/entities/client.entity"
import { PaginatedMetaDto } from "src/shared/dto/paginated.dto"

const statusArray = ["in_transit", "delivered","damaged"]

export class CreatePackageDto {

    @ApiProperty({
        type: Number
    })
    @IsNumber()
    client: Client

    @ApiProperty()
    @IsString()
    trackingNumber: string

    @ApiProperty()
    @IsNumber()
    weight: number

    @IsNumber()
    @ApiProperty()
    volume: number
    @IsNumber()
    @ApiProperty()
    value: number

    @ApiProperty()
    @IsDate()
    sendingDate: Date|null

    @ApiProperty()
    @IsDate()
    receiptDate: Date|null

    @ApiProperty()
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    charge: Charge|null

    @ApiProperty()
    @ApiPropertyOptional()
    @IsOptional()
    @IsEnum(statusArray, {message: "status must be one of the following values: "+statusArray})
    status: "in_transit"| "delivered"| "damaged"
}

export class DefaultPackageResponse extends CreatePackageDto {
    @ApiProperty()
    id: number

    @ApiProperty()
    createdAt: Date

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty({
        type: DefaultClientResponse
    })
    client: Client

    @ApiProperty({
        type: DefaultChargeResponse
    })
    charge: Charge|null
}

export class PaginatedPackagesResponse {

    @ApiProperty({
        type: PaginatedMetaDto
    })
    meta: any
    @ApiProperty({
        type: DefaultPackageResponse,
        isArray: true
    })
    data: DefaultPackageResponse[]
}
