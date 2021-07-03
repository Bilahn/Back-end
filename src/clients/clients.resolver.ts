import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver , Query, Subscription } from '@nestjs/graphql';
import { Clients } from './clients.entity';
import { ClientsService } from './clients.service';
import { CreateClientsInput } from './dto/create-clients.input';
import { LoginClientsInput } from './dto/login-clients.input';
import { GqlAuthGuard } from '../guards/gql-auth.guards';
import { UserToken } from './userToken.entity';
import { CtxClient } from 'src/decoraters/ctx-user.decorator';
import { ClientUpdateInput } from './dto/update-client'; 

@Resolver(of => Clients)
export class ClientsResolver {
    constructor(private clientService : ClientsService) {} 
 
    @Mutation(()=>Clients)
    register(@Args('createClientInput') createClientsInput : CreateClientsInput ) : Promise<Clients>  {
    console.log(createClientsInput)
        return this.clientService.register(createClientsInput) 
    }

 

    @UseGuards(GqlAuthGuard)
    @Query(()=>Clients)
    getClientById(@CtxClient() client : Clients ){
      return this.clientService.findClientById(client.id) 
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(()=>String)
    updateClient(@CtxClient() client : Clients , @Args('update') clientInput : ClientUpdateInput ){
      console.log("clientId",client.id,"clientInput",clientInput)
      return this.clientService.updateById(client.id,clientInput)
    }

   @Mutation(()=>UserToken)
   login(@Args('loginClientsInput') loginClientsInput : LoginClientsInput) : Promise<UserToken> {
     console.log(loginClientsInput)
           return this.clientService.login(loginClientsInput) ; 
   }

   @Query(() => [Clients], { name: 'allClients' })
   findAll() {
     return this.clientService.findAll();
   }

}

