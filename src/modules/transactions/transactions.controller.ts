import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto, DefaultTransactionResponse, PaginatedTransactionsResponse } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('transactions')
@ApiTags('transactions')
export class TransactionsController {
  constructor(private readonly service: TransactionsService) {}


  @Get("faker/generate")
  fake() {
    return this.service.faker();
  }

 
  @Post()
  @ApiResponse({
    type: DefaultTransactionResponse
  })
  create(@Body() payload: CreateTransactionDto) {
    return this.service.create(payload);
  }

  @Get()
  @ApiResponse({
    type: PaginatedTransactionsResponse
  })
  @ApiQuery({ name: 'page', type: 'string', required: false, })
  @ApiQuery({ name: 'limit', type: 'string', required: false, })
  @ApiQuery({ name: 'q', required: false, })
  findAll(@Query('page') page: string = "1",
  @Query('limit') limit: string = "100",@Query('q') q: string,) {
    return this.service.findAll({ limit: Number(limit), page: Number(page), q });
  }

  @Get(':id')  
  @ApiResponse({
    type: DefaultTransactionResponse
  })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    type: DefaultTransactionResponse
  })
  update(@Param('id') id: string, @Body() payload: UpdateTransactionDto) {
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
