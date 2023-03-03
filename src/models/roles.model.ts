
import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "../models/users.model";
import { UserRoles } from "../models/user-roles.model";

interface IRoles{
    value: string;
    description: string;
}

@Entity({name: 'roles'})
export class Role implements IRoles{
    @ApiProperty({example: '1', description: `Unique id`})
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ApiProperty({example: 'ADMIN/', description:`Value of role of user`})
    @Column({
        type: "varchar", unique: true, nullable: false,
    })
    value: string;

    @ApiProperty({example: 'Administrator', description:`Role description`})
    @Column({
        type: "varchar", nullable: false,
    })
    description: string;

    @OneToMany(()=>User, ()=> UserRoles)
    users: User[]
}
