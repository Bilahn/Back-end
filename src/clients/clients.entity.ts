import { ObjectType , Field , Int } from "@nestjs/graphql";
import { Booking } from "src/booking/entities/booking.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";



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
    email : string ; 

    @Column()
    password : string ; 


    @Column({nullable : true}) 
    phoneNumber : number ; 

    @OneToMany(()=> Booking ,booking => booking.client )
    @Field(type => [Booking] , {nullable : true })
    booking?: Booking[]

}
