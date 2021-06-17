import { InputType , Field } from "@nestjs/graphql";
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

@InputType()
export class LoginClientsInput {
 
    @IsEmail()
    @Field()
    email : string ; 

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Field()
    password : string ; 

}

