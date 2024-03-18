import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateOfficeDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    description: string|null
}

export class DefaultOfficeResponse extends CreateOfficeDto {
    @ApiProperty()
    id: number

    @ApiProperty()
    createdAt: Date

    @ApiProperty()
    updatedAt: Date;
}