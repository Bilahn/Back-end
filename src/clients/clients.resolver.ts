import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver , Query } from '@nestjs/graphql';
import { Clients } from './clients.entity';
import { ClientsService } from './clients.service';
import { CreateClientsInput } from './dto/create-clients.input';
import { LoginClientsInput } from './dto/login-clients.input';
import { GqlAuthGuard } from '../guards/gql-auth.guards';
import { UserToken } from './userToken.entity';
import { CtxClient } from 'src/decoraters/ctx-user.decorator';


@Resolver(of => Clients)
export class ClientsResolver {
    constructor(private clientService : ClientsService) {} 
  @UseGuards(GqlAuthGuard)
  @Query(()=>String)
  me(@CtxClient() client : Clients ){
    return "hello"
  }

  @Mutation(()=>Clients)
  register(@Args('createClientInput') createClientsInput : CreateClientsInput ) : Promise<Clients> {
        return this.clientService.register(createClientsInput) 
  }

  @UseGuards(GqlAuthGuard)
    @Query(()=>Clients)
    getClients(@CtxClient() client : Clients ){
      return this.clientService.findClientById(client.id) 
    }


   @Mutation(()=>UserToken)
   login(@Args('loginClientsInput') loginClientsInput : LoginClientsInput) : Promise<UserToken> {
           return this.clientService.login(loginClientsInput) ; 
   }

}

