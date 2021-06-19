import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ClientsService } from "../clients/clients.service";
// import { JwtDto } from "../jwt.dto";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private service : ClientsService) {
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey : "SINSALAMINALADINLABESDJIN"
         })
        }


       async validate(payload : { clientId : number }){
        const client = await this.service.validateClient(payload.clientId)


        if(!client){
             throw new UnauthorizedException()
        }

        return client 
     }  
}

