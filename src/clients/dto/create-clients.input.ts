import { InputType , Field } from "@nestjs/graphql";
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";


@InputType()
export class CreateClientsInput {

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Field() 
    name : string ;



    @IsEmail()
    @Field() 
    email : string ;


    @Field()
    phoneNumber : number ; 
    
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Field() 
    password : string ; 

   

}
