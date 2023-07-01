import {Entity,PrimaryGeneratedColumn,Column, OneToMany, JoinColumn, OneToOne, ManyToOne } from "typeorm"

@Entity({name :"check"})
export class Check{
    @PrimaryGeneratedColumn()
    id  :number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    qty: number;

    @Column()
    price: number;


}