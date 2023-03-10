import { Body, Query, Param, Controller, Get, Post, Put, Delete, UseGuards, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { query } from 'express';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { EditUserDto } from 'src/dto/edit-user.dto';
import { JwtAuthGuard } from 'src/guards/jwt.auth.guard';
import { User } from 'src/models/users.model';
import { UsersService } from 'src/services/users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    @ApiOperation({summary: `/Создание пользователя`})
    @ApiResponse({status: 200, type: User})
    // @UsePipes(ValidationPipe)
    @Post()
    create(@Body() userDto: CreateUserDto){
        return this.usersService.createUser(userDto);
    }

    @ApiOperation({summary: `/Просмотр списка`})
    @ApiResponse({status: 200, type: [User]})
    // @Roles('ADMIN')
    @UseGuards(JwtAuthGuard)
    @Get()
    getAll(@Query() query: {all:boolean}){
        return this.usersService.getAllUsers(query);
    }

    @ApiOperation({summary: `Редактирование`})
    @ApiResponse({status: 200, type: User})
    // @UsePipes(ValidationPipe)
    @Put(':id')
    edit(@Param() id, @Body() userDto){
        return this.usersService.editUser(id, userDto);
    }

    @ApiOperation({summary: `Удаление (деактивация)`})
    @ApiResponse({status: 200})
    // @Roles('ADMIN')
    // @UseGuards(RoleGuard)
    @Delete(':id')
    softDelete(@Param() id){
        return this.usersService.softDelete(id);
    }
}
