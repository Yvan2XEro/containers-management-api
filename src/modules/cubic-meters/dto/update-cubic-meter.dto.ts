import { PartialType } from '@nestjs/swagger';
import { CreateCubicMeterDto } from './create-cubic-meter.dto';

export class UpdateCubicMeterDto extends PartialType(CreateCubicMeterDto) {}
