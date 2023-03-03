import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './users.module';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
// import { PassportModule } from '@nestjs/passport';
// import {  } from '../guards/local.auth.guard';
import { JwtStrategy } from '../strategy/jwt.strategy';
// import { LocalStrategy } from '../strategy/local.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    // forwardRef(() => UsersModule),
    JwtModule.registerAsync({
      useFactory:  () => {
        return {
          secret: process.env.JWT_KEY|| 'SECRET',
          signOptions: {
            expiresIn: process.env.JWT_EXP_TIME || '1h'
          }
        }
      }
    }),
    UsersModule,
    // PassportModule
  ],
  exports: [
    AuthService,
    JwtModule
  ] 
})
export class AuthModule {}
