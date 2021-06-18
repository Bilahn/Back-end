import { Field , ObjectType } from "@nestjs/graphql"; 
import { Clients } from "./clients.entity";


@ObjectType()
export class UserToken {
    @Field()
    token : string


    @Field()
    client : Clients
    
}