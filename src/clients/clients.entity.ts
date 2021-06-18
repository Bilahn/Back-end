import { ObjectType , Field , Int } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity()
@ObjectType()
export class Clients {

    @PrimaryGeneratedColumn()
    @Field(type=>Int) 
    id : number ; 

    @Column()
    @Field()
    name : string ; 

    @Column()
    @Field() 
    lastname : string ; 

    @Column()
    @Field()
    username : string ; 

    @Column()
    @Field()
    email : string ; 

    @Column()
    password : string ; 

}
