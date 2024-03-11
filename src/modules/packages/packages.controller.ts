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
import { PackagesService } from './packages.service';
import {
  CreatePackageDto,
  DefaultPackageResponse,
  PaginatedPackagesResponse,
} from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('packages')
@ApiTags('packages')
export class PackagesController {
  constructor(private readonly service: PackagesService) {}

  @Post()
  @ApiResponse({
    type: DefaultPackageResponse,
  })
  create(@Body() payload: CreatePackageDto) {
    return this.service.create(payload);
  }

  @Get()
  @ApiResponse({
    type: PaginatedPackagesResponse,
  })
  @ApiQuery({ name: 'page', type: 'string', required: false })
  @ApiQuery({ name: 'limit', type: 'string', required: false })
  @ApiQuery({ name: 'client', type: 'string', required: false })
  @ApiQuery({ name: 'q', required: false })
  findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '100',
    @Query('q') q: string,
    @Query('client') client: string,
  ) {
    return this.service.findAll({
      limit: Number(limit),
      page: Number(page),
      q,
      client: +client,
    });
  }

  @Get('charges/:id')
  @ApiResponse({
    type: DefaultPackageResponse,
    isArray: true,
  })
  findByChargeId(@Param('id') id: string) {
    return this.service.findByChargeId(+id);
  }

  @Get(':id')
  @ApiResponse({
    type: DefaultPackageResponse,
  })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    type: DefaultPackageResponse,
  })
  update(@Param('id') id: string, @Body() payload: UpdatePackageDto) {
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
