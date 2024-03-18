import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from '../../auth/decorators/public.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import {
  CreateUserDto,
  DefaultUserResponse,
  UpdateUserDto,
} from '../dto/create-user.dto';
import { UsersService } from '../services/users.service';
import { AdminGuard } from '../../auth/guards/admin.guard';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly service: UsersService) { }

  @ApiOperation({ summary: 'create a user' })
  @ApiResponse({
    status: 201,
    type: DefaultUserResponse,
  })
  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.service.create(createUserDto);
  }


  @ApiResponse({
    status: 200,
    isArray: true,
    type: DefaultUserResponse,
  })
  @ApiBearerAuth('access-token')
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: 200,
    type: DefaultUserResponse,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @ApiBearerAuth('access-token')
  @Patch(':id')
  @ApiResponse({
    status: 200,
    isArray: true,
    type: DefaultUserResponse,
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.service.update(id, updateUserDto);
  }

  @ApiBearerAuth('access-token')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Patch(':id/grant-admin')
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: 200,
    isArray: true,
    type: DefaultUserResponse,
  })
  public grantAdmin(@Param('id') id: string) {
    return this.service.grantAdmin(id);
  }

  @Patch(':id/revoke-admin')
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: 200,
    isArray: true,
    type: DefaultUserResponse,
  })
  public revokeAdmin(@Param('id') id: string) {
    return this.service.revokeAdmin(id);
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
