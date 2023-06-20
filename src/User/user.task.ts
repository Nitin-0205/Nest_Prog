import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";

@Injectable()
export class UserScheduledTask{
    @Cron('1 * * * * *',{name:'notification'})
    handleCron(){
    // console.log('Called every 3 seconds');
    }
}