import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Office } from '../../../modules/offices/entities/office.entity';
import { DefaultOfficeResponse } from '../../../modules/offices/dto/create-office.dto';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsString()
  readonly photo?: string;

  @ApiProperty()
  @IsString()
  phone: string | null;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  office?: Office | null;

}


export class UpdateUserDto extends PartialType(CreateUserDto) { }

export class DefaultUserResponse extends CreateUserDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;

  @ApiProperty({type: DefaultOfficeResponse})
  office?: Office;
}
