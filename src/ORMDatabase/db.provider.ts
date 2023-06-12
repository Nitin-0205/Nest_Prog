import { SignUpOrm } from "src/Auth/Dto/Orm.Entity";
import { DataSource } from "typeorm";

export const DbProvider = [{
    provide:'DATA_SOURCE',
    useFactory:async ()=>{
        const dataSource = new DataSource({
            type:'postgres',
            host:'localhost',
            port:5432,
            username:'postgres',
            password:'1234',
            database:"sql_demo",
            entities: [SignUpOrm],
            synchronize: true,

        });
        return dataSource.initialize();

    }
}]