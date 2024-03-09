import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ChargesService } from './charges.service';
import { CreateChargeDto,DefaultChargeResponse,PaginatedChargesResponse } from './dto/create-charge.dto';
import { UpdateChargeDto } from './dto/update-charge.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('charges')
@ApiTags('charges')
export class ChargesController {
  constructor(private readonly service: ChargesService) {}
  
  @Get("faker/generate")
  fake() {
    return this.service.faker();
  }

  @Post()
  @ApiResponse({
    type: DefaultChargeResponse
  })
  create(@Body() payload: CreateChargeDto) {
    return this.service.create(payload);
  }

  @Get()
  @ApiResponse({
    type: PaginatedChargesResponse
  })
  @ApiQuery({ name: 'page', type: 'string', required: false, })
  @ApiQuery({ name: 'limit', type: 'string', required: false, })
  @ApiQuery({ name: 'transaction', type: 'string', required: false, })
  @ApiQuery({ name: 'q', required: false, })
  findAll(@Query('page') page: string = "1",
  @Query('limit') limit: string = "100",@Query('q') q: string,@Query('transaction') transaction: string,) {
    return this.service.findAll({ limit: Number(limit), page: Number(page), q , transaction: +transaction});
  }

  @Get(':id')  
  @ApiResponse({
    type: DefaultChargeResponse
  })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    type: DefaultChargeResponse
  })
  update(@Param('id') id: string, @Body() payload: UpdateChargeDto) {
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
