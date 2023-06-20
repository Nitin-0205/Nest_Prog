import {Entity,PrimaryGeneratedColumn,Column, OneToMany, JoinColumn, OneToOne, ManyToOne } from "typeorm"
import { Profile } from "./user_profile.entity";
import { User } from "./user.entity";

@Entity({name :"post"})
export class Post{
    @PrimaryGeneratedColumn()
    id  :number;

    @Column()
    title : string;

    @Column()
    description :string;

    @Column()
    email :string;

    @ManyToOne(()=>User,user=>user.post)    
    user:User;


}