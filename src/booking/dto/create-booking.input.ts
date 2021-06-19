import { InputType, Int, Field } from '@nestjs/graphql';
import { Clients } from 'src/clients/clients.entity';

@InputType()
export class CreateBookingInput {
  @Field()
  date :string 

  @Field()
  duration : string 

  @Field()
  type : string 

  @Field()
  adresse : string 

  @Field()
  space : string 

  @Field()
  description?: string

}
