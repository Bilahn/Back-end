import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Clients } from 'src/clients/clients.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';



@Entity()
@ObjectType()
export class Booking {
  @PrimaryGeneratedColumn()
  @Field(type=>Int)
  id : number 

  @Column()
  @Field()
  date :string 

  // @Column()
  // @Field(type=>Int)
  // duration : number 

  // @Column({default: "Not Completed!"})
  // @Field()
  // status?: string ; 

  @Column()
  @Field(type=>Int)
  price : number 

  @Column()
  @Field()
  type : string 

 @Column()
  @Field()
  description : string 
  // @Column()
  // @Field()
  // adresse : string 

  // @Column()
  // @Field()
  // space : string 

  // @Column()
  // @Field(type => Int,{nullable:true})
  // clientId?: number ; 

  @ManyToOne(()=> Clients , client => client.booking )
  @Field(type=>Clients ,{nullable:true})
  client?: Clients 
}
