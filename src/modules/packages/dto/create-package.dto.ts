import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsDate, IsEnum, IsNumber, IsOptional, IsString } from "class-validator"
import { DefaultChargeResponse } from "../../../modules/charges/dto/create-charge.dto"
import { Charge } from "../../../modules/charges/entities/charge.entity"
import { DefaultClientResponse } from "../../../modules/clients/dto/create-client.dto"
import { Client } from "../../../modules/clients/entities/client.entity"
import { PaginatedMetaDto } from "../../../shared/dto/paginated.dto"
import { CubicMeter } from "../../../modules/cubic-meters/entities/cubic-meter.entity"
import { DefaultCubicMeterResponse } from "../../../modules/cubic-meters/dto/create-cubic-meter.dto"

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

    @ApiProperty()
    @IsNumber()
    cubicMeter: CubicMeter

    @ApiProperty()
    @IsNumber()
    cubicMetersCount: number
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

    @ApiProperty({
        type: DefaultCubicMeterResponse
    })
    cubicMeter: CubicMeter
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
