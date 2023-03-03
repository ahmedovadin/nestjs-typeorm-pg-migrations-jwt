import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

interface IUsers{
    email: string;
    password: string;
}

@Entity({name: 'users'})
export class User implements IUsers{
    @ApiProperty({example: '1', description: `Unique id`})
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ApiProperty({example: 'example@mail.com', description:`email`})
    @Column({
        type: "varchar", unique: true, nullable: false, length: 30
    })
    email: string;

    @ApiProperty({example: '12345', description:`Password`})
    @Column({
        type: "varchar", nullable: false
    })
    password: string;

    @ApiProperty({example: 'Ivanov Ivan', description:`Fullname`})
    @Column({
        type: "varchar", unique: false, nullable: true
    })
    fullname: string;

    @ApiProperty({example: '25', description:`Age`})
    @Column({
        nullable: true
    })
    age: number;

    @Column('boolean', { default: true })
    @ApiProperty({default: true, description:`is a user active`})
    active: boolean;

    @Column({
        type: "varchar", nullable: true
    })
    @ApiProperty({nullable: true, description:`Last log in`})
    lastLogin: string;
}
