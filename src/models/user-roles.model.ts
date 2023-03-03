
import { ApiProperty } from "@nestjs/swagger";
// import { Model, Column, DataType, Table, BelongsToMany, ForeignKey } from "sequelize-typescript";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable} from "typeorm"
import { User } from "../models/users.model";
import { Role } from "../models/roles.model";

// @Entity({name: 'user-roles', createdAt: false, updatedAt: false})
@Entity({name: 'user-roles'})
export class UserRoles {
    @ApiProperty({example: '1', description: `Unique id`})
    @PrimaryGeneratedColumn('increment')
    // @Column({
    //     unique: true, autoIncrement: true, primaryKey: true
    // })
    id: number;

    @ManyToOne(() => Role, role => role.id, {
        cascade: true
    })
    @JoinTable()
    role: Role

    @Column()
    roleId: number;

    
    @ManyToOne(() => User, user => user.id, {
        cascade: true
    })
    @JoinTable()
    user: User

    @Column()
    userId: number;
    
}