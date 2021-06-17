import { Args, Mutation, Resolver , Query } from '@nestjs/graphql';
import { Clients } from './clients.entity';
import { ClientsService } from './clients.service';
import { CreateClientsInput } from './dto/create-clients.input';
import { LoginClientsInput } from './dto/login-clients.input';


@Resolver(of => Clients)
export class ClientsResolver {
    constructor(private clientService : ClientsService) {} 
   
@Query(() => Clients)
  getClientsByEmail(email : string) : Promise <Clients>{
   return this.clientService.getClientByEmail(email)
  }
  



    @Mutation(()=>Clients)
    register(@Args('createClientInput') createClientsInput : CreateClientsInput ) : Promise<Clients> {
        return this.clientService.register(createClientsInput) 
    }


   @Mutation(()=>String)
   login(@Args('loginClientsInput') loginClientsInput : LoginClientsInput) : Promise<String> {
           return this.clientService.login(loginClientsInput) ; 
   }

}

