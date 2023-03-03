import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, isString, Length } from "class-validator";

export class EditUserDto{
    @ApiProperty({example: 'email.com', description: `email address`})
    @IsString({'message': 'Email must be string'})
    @IsEmail({}, {'message': 'Incorrect email'})
    readonly email?: string;

    @ApiProperty({example: '12312351243fsfsd', description: `password`})
    @Length(4, 16, {message: 'Password must > 4 and < 16'})
    readonly password?: string;
}