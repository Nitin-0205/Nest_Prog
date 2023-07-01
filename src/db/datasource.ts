import { User } from "src/entities/user.entity";
import { DataSource, DataSourceOptions } from "typeorm";

export const typeOrmDataSrc :DataSourceOptions  = {
    type:"postgres",
    host :"localhost",
    port:5432,
    username:"postgres",
    password:"1234",
    database:"typeormdb",
    // autoloadEntities:true,
    entities :["dist/**/*.entity{.ts,.js}"],
    logging:true,
    migrations:["dist/migration/*.js"],
    // cli:{migrationsDir:"src/migrations/"},
    migrationsTableName:"migrations_typeorm",
}

const dataSrc = new DataSource(typeOrmDataSrc)
export default dataSrc;
