import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../models/users.model';
import { UsersService } from '../services/users.service';
import * as bcrypt from 'bcryptjs'
import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class AuthService{

    constructor(private userService: UsersService,
                private jwtsService: JwtService){
                }

    async login(userDto: CreateUserDto){
        const user = await this.validateUser(userDto);

        if (!user) {
            throw new UnauthorizedException();
        }

        return this.generateToken(user);
    }

    async registration(userDto: CreateUserDto){
        const candidate = await this.userService.getUserByEmail(userDto.email)

        if(candidate){
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST)
        }

        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({...userDto, password: hashPassword})
        return this.generateToken(user)
    }

    private async generateToken(user: User){
        // const payload = {email: user.email, id: user.id, roles: user.roles}
        const payload = {email: user.email, id: user.id}
        return {
            token: this.jwtsService.sign(payload)
        }
    }

    private async  validateUser(userDto: CreateUserDto){
        const user = await this.userService.getUserByEmail(userDto.email);
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        console.log('passwordsEquals', userDto.password, user.password)
        if(user && passwordEquals){
            return user;
        }
        throw new UnauthorizedException({message: 'Incorrect email or password'})
    }
    
}
