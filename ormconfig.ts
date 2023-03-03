import "reflect-metadata"
import { DataSource, DataSourceOptions } from 'typeorm'
import { User } from './src/models/users.model'
import { Role } from './src/models/roles.model'
import { UserRoles } from './src/models/user-roles.model'

export const options: DataSourceOptions = {
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    database: process.env.POSTGRES_DATABAS,
    synchronize: true,
    logging: false,
    entities: [User, Role, UserRoles],
    migrations: [
        "src/migration/**/*{.js,.ts}"
    ]
    // subscribers: [],
};

const dataSourceMigration = JSON.parse(JSON.stringify(options));
// dataSourceMigration.host = process.env.POSTGRES_INNER_HOST;
dataSourceMigration.migrations = [
    "./src/migration/**/*{.js,.ts}"
]

export const config = new DataSource (options)




