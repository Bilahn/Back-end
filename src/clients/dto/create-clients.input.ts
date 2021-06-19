import { InputType , Field } from "@nestjs/graphql";
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";


@InputType()
export class CreateClientsInput {

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Field() 
    name : string ;
    
    // @IsString()
    // @MinLength(4)
    // @MaxLength(20)
    // @Field()
    // lastname : string ; 


    
    // @IsString()
    // @MinLength(4)
    // @MaxLength(20)
    // @Field() 
    // username : string ; 



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

    // @IsString()
    // @MinLength(4)
    // @MaxLength(20)
    // @Field()  
    // confirmPassword : string ; 

}
