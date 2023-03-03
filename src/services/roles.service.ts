import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto } from '../dto/create-role.dto';
import { Role } from '../models/roles.model';

@Injectable()
export class RolesService {
    constructor(@InjectRepository(Role) private roleRepository: typeof Role){

    }

    async createRole(dto: CreateRoleDto){
        // const role = await this.roleRepository.save(dto);
        // return role;
    }

    async getRoleByValue(value: string){
        // const role = await this.roleRepository.find({where: {value}});
        // return role;
    }
}
