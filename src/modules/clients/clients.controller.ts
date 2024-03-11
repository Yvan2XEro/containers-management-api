import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto, DefaultClientResponse , PaginatedClientsResponse} from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('clients')
@ApiTags('clients')
export class ClientsController {
  constructor(private readonly service: ClientsService) {}

  @Get("faker/generate")
  fake() {
    return this.service.faker();
  }
  
  @Post()
  @ApiResponse({
    type: DefaultClientResponse
  })
  create(@Body() payload: CreateClientDto) {
    return this.service.create(payload);
  }

  @Get()
  @ApiResponse({
    type: PaginatedClientsResponse
  })
  @ApiQuery({ name: 'page', type: 'string', required: false, })
  @ApiQuery({ name: 'limit', type: 'string', required: false, })
  @ApiQuery({ name: 'q', required: false, })
  findAll(@Query('page') page: string = "1",
  @Query('limit') limit: string = "100",@Query('q') q: string,) {
    return this.service.findAll({ limit: Number(limit), page: Number(page), q });
  }

  @Get("/search")
  @ApiResponse({
    type: DefaultClientResponse
  })
  @ApiQuery({ name: 'q', required: true, })
  findAllWintnPagination(@Query('q') q: string) {
    return this.service.findAllWintnPagination({q})
  }

  @Get(':id')  
  @ApiResponse({
    type: DefaultClientResponse
  })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    type: DefaultClientResponse
  })
  update(@Param('id') id: string, @Body() payload: UpdateClientDto) {
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
