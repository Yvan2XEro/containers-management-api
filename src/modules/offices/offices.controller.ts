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
import { OfficesService } from './offices.service';
import {
  CreateOfficeDto,
  DefaultOfficeResponse,
} from './dto/create-office.dto';
import { UpdateOfficeDto } from './dto/update-office.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('offices')
@ApiTags('offices')
export class OfficesController {
  constructor(private readonly service: OfficesService) {}

  @Post()
  @ApiResponse({
    type: DefaultOfficeResponse,
  })
  create(@Body() payload: CreateOfficeDto) {
    return this.service.create(payload);
  }

  @Get()
  @ApiResponse({
    type: DefaultOfficeResponse,
    isArray: true,
  })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiResponse({
    type: DefaultOfficeResponse,
  })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    type: DefaultOfficeResponse,
  })
  update(@Param('id') id: string, @Body() payload: UpdateOfficeDto) {
    return this.service.update(+id, payload);
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
