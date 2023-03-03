import { Module, Global, DynamicModule } from '@nestjs/common';
import { join } from 'path';
// import { EnvService } from '../env/env.service';
import {TypeOrmModule, TypeOrmModuleOptions} from '@nestjs/typeorm';
// import { User } from 'src/models/users.model'
import { options } from '../../ormconfig';
// impor t { EnvModule } from '../env/env.module';

function DatabaseOrmModule(): DynamicModule {
//   const config = new EnvService().read();

  return TypeOrmModule.forRoot(options);
}

@Global()
@Module({
  imports: [
    // EnvModule,
    DatabaseOrmModule(),
  ],
})
export class DatabaseModule { }