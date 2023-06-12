import  {DataSource} from 'typeorm'
import { SignUpOrm } from './Orm.Entity'

export  const OrmProvider = [{
    provide:'SIGN_REPO',
    useFactory:(dataSource:DataSource)=>dataSource.getRepository(SignUpOrm),
    inject:['DATA_SOURCE'],
}]