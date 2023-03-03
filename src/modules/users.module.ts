import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { AuthModule } from 'src/auth/auth.module';
// import { Role } from 'src/roles/roles.model';
// import { RolesModule } from 'src/roles/roles.module';
import { UsersController } from '../controllers/users.controller';
import { User } from '../models/users.model';
import { UsersService } from '../services/users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    // TypeOrmModule.forFeature([User, Role]),
    TypeOrmModule.forFeature([User]),
    // RolesModule,
    // forwardRef(() => AuthModule),
  ],
  exports: [
    UsersService
  ]
})
export class UsersModule {}
