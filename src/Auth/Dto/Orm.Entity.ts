 import {Entity, Column, PrimaryGeneratedColumn}from "typeorm";
 import {ApiProperty } from "@nestjs/swagger";


@Entity()
export class SignUpOrm {
    @PrimaryGeneratedColumn()
    id:number;

    @ApiProperty()
    @Column()
    name :string;

    @ApiProperty()
    @Column()
    email:string;

    @ApiProperty()
    @Column()
    password:string;
}