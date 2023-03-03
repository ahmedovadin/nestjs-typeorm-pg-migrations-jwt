import { Module } from '@nestjs/common';
import { RolesService } from 'src/services/roles.service';
import { RolesController } from '../controllers/roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../models/roles.model';
import { User } from '../models/users.model';
import { UserRoles } from '../models/user-roles.model';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [
    TypeOrmModule.forFeature([Role, User, UserRoles]),
  ],
  exports: [
    RolesService
  ]
})
export class RolesModule {}
