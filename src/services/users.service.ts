import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { Repository, QueryRunner } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Console } from 'console';
// import { RolesService } from 'src/roles/roles.service';
// import { AddRoleDto } from './dto/add-role.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { EditUserDto } from '../dto/edit-user.dto';
import { User } from '../models/users.model';
import { query } from 'express';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){}
   
    async createUser(dto: CreateUserDto){
        const user = await this.userRepository.save(dto);
        return user;
    }

    async getAllUsers(q){
        console.log('q', q);
        const users = (q?.all == "true") ? await this.userRepository.find() : await this.userRepository.find({where: {active: false}});
        return users
    }

    async editUser(id, dto){
        const user = await this.userRepository.update(id, dto);
        return user
    }

    async getUserByEmail(email: string){
        const user= await this.userRepository.findOneBy({email})
        return user;
    }

    // async addRole(dto: AddRoleDto){
    //     const user = await this.userRepository.findByPk(dto.userId);
    //     const role = await this.roleService.getRoleByValue(dto.value)

    //     if(role && user){
    //         await user.$add('role', role.id);
           
    //         return dto;
    //     }
    //     throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
    // }

    async softDelete(idParam){
        const user = await this.userRepository.findOneBy({id: parseInt(idParam.id)});
        if(!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        user.active = false
        await this.userRepository.save(user)

        return user;
    }
}
