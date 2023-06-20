import {Entity,PrimaryGeneratedColumn,Column, OneToMany, JoinColumn, OneToOne } from "typeorm"
import { Profile } from "./user_profile.entity";
import { Post } from "./post.entity";



@Entity({name :"sign_up_orm"})
export class User{
    @PrimaryGeneratedColumn()
    id  :number;

    @Column()
    userName : string;

    @Column()
    contact :number;

    @Column({
        unique:true
    })
    email :string ;

    @Column()
    password :string ;

    @OneToOne(()=>Profile)
    @JoinColumn()
    profile:Profile;

    @OneToMany(()=>Post,post=>post.user)
    post:Post[];


}