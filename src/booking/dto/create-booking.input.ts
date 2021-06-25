import { InputType, Int, Field } from '@nestjs/graphql';


@InputType()
export class CreateBookingInput {
  @Field()
  date :string 

  @Field(type=>Int)
  duration : number  

  @Field()
  type : string 

  @Field()
  adresse : string 

  @Field()
  space : string 

  @Field()
  description?: string

  @Field(type=>Int)
  price : number 

}
