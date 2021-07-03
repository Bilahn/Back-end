import { PassportStrategy } from "@nestjs/passport";
import { Strategy , VerifyCallback  } from "passport-google-oauth20"
import { Injectable } from "@nestjs/common";


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy , 'google'){
    constructor(){
        super({
           clientID : "127080123771-b5g3lchad417a9b3k9mhtru4ck2v04e1.apps.googleusercontent.com" , 
           clientSecret : "qDfIBeBRavuCN2wLUSTEvQ2C", 
           callbackURL : "http://localhost:3000/auth/google/callback", 
           scope : ['email','profile']
        })
    }
    async validate(accessToken : string , refreshToken : string , profile : any , done : VerifyCallback) : Promise<any>{
        const {name , emails , phoneNumber , age  } = profile 
        const user = {
           email : emails[0].value , 
           firstName : name.givenName, 
           lastName : name.familyName , 
           phoneNumber , 
           age , 
           accessToken
           
        }
        done(null , user)
    }
}