import { InputType , Field } from "@nestjs/graphql"; 


@InputType()
export class ClientUpdateInput {
 
    @Field()
    name : string ; 

    @Field({nullable : true})
    email : string ; 

    @Field({nullable : true})
    phoneNumber : number 
}