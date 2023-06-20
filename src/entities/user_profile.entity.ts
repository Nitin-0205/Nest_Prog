import { Transform } from "class-transformer";
import { Entity, PrimaryGeneratedColumn ,Column, ManyToMany, ManyToOne, OneToOne} from "typeorm";
import { User } from "./user.entity";

@Entity({name :"user_profile"})
export class Profile {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    first_name :string;

    @Column()
    last_name :string;

    @Column({unique:true})
    email:string;

    @Column()
    age:string;

    @Column()
    address :string ;

}