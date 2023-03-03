
import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable} from "typeorm"
import { User } from "../models/users.model";
import { Role } from "../models/roles.model";

@Entity({name: 'user-roles'})
export class UserRoles {
    @ApiProperty({example: '1', description: `Unique id`})
    @PrimaryGeneratedColumn('increment')
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
