import { Body, Query, Param, Controller, Get, Post, Put, Delete, UseGuards, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { query } from 'express';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
// import { Roles } from 'src/auth/role-auth.decorator';
// import { RoleGuard } from 'src/auth/role.guards';
// import { ValidationPipe } from 'src/pipes/validation.pipe';
// import { AddRoleDto } from 'src/dto/add-role.dto';
// import { BanUserDto } from 'src/dto/ban-user.dto';
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
    // @UseGuards(RoleGuard)
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

    // @ApiOperation({summary: `Give role`})
    // @ApiResponse({status: 200})
    // @Roles('ADMIN')
    // @UseGuards(RoleGuard)
    // @Post('/role')
    // addRole(@Body() dto: AddRoleDto){
    //     return this.usersService.addRole(dto);
    // }

    @ApiOperation({summary: `Удаление (деактивация)`})
    @ApiResponse({status: 200})
    // @Roles('ADMIN')
    // @UseGuards(RoleGuard)
    @Delete(':id')
    softDelete(@Param() id){
        return this.usersService.softDelete(id);
    }
}
