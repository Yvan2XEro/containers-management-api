import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CubicMetersService } from './cubic-meters.service';
import {
  CreateCubicMeterDto,
  DefaultCubicMeterResponse,
} from './dto/create-cubic-meter.dto';
import { UpdateCubicMeterDto } from './dto/update-cubic-meter.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('cubic-meters')
@ApiTags('cubic-meters')
export class CubicMetersController {
  constructor(private readonly service: CubicMetersService) {}

  @Post()
  @ApiResponse({
    type: DefaultCubicMeterResponse,
  })
  create(@Body() createCubicMeterDto: CreateCubicMeterDto) {
    return this.service.create(createCubicMeterDto);
  }

  @Get()
  @ApiResponse({
    type: [DefaultCubicMeterResponse],
  })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiResponse({
    type: [DefaultCubicMeterResponse],
  })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    type: [DefaultCubicMeterResponse],
  })
  update(
    @Param('id') id: string,
    @Body() updateCubicMeterDto: UpdateCubicMeterDto,
  ) {
    return this.service.update(+id, updateCubicMeterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
  @Delete()
  @ApiOperation({ summary: 'Delete multi items by ids ( ?ids=1,2,3,4,5 )' })
  @ApiQuery({ name: 'ids', type: 'string' })
  public async deleteMany(@Query('ids') ids: string) {
    if (!ids?.length) {
      return Promise.resolve();
    }
    return this.service.removeMany(ids?.split(',').map((item) => +item));
  }
}
