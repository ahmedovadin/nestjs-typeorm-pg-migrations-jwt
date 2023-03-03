import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";

import { DatabaseModule } from './modules/database.module';
import { UsersModule } from './modules/users.module';
import { AuthModule } from './modules/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { RolesModule } from './modules/roles.module';
// import { LocalStrategy } from './strategy/local.strategy';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    RolesModule,
    AuthModule,
    PassportModule,
    JwtModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
