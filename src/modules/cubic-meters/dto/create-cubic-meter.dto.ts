import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateCubicMeterDto {
    @IsString()
    @ApiProperty()
    label: string;

    @IsNumber()
    @ApiProperty()
    value: number;

    @IsBoolean()
    @ApiProperty()
    isActive: boolean
}

export class DefaultCubicMeterResponse extends CreateCubicMeterDto{
    @ApiProperty()
    id: number

    @ApiProperty()
    createdAt: Date

    @ApiProperty()
    updatedAt: Date;
}
