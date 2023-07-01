import {Entity,PrimaryGeneratedColumn,Column } from "typeorm"

@Entity({name :"items"})
export class Item{
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

    @Column({default:"ALL"})
    Catagories: string;



}