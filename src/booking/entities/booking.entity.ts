import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Clients } from 'src/clients/clients.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';



@Entity()
@ObjectType()
export class Booking {
  @PrimaryGeneratedColumn()
  @Field(type=>Int)
  id : number 

  @Column()
  @Field()
  date :string 

  @Column()
  @Field()
  duration : string 

  // @Column()
  // @Field(type=>Int , { nullable : true })
  // rating : number

  // @Column()
  // @Field({nullable : true})
  // status : string 

  // @Column()
  // @Field(type=>Int,{ nullable : true })
  // price : number 

  @Column()
  @Field()
  type : string 

  @Column()
  @Field()
  adresse : string 

  @Column()
  @Field()
  space : string 

  // @Column()
  // @Field({nullable:true})
  // description?: string 

  @Column()
  @Field(type => Int,{nullable:true})
  clientId?: number ; 

  @ManyToOne(()=> Clients , client => client.booking )
  @Field(type=>Clients,{nullable:true})
  client?: Clients 
}
