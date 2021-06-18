import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsResolver } from './clients.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clients } from './clients.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { GqlAuthGuard } from '../guards/gql-auth.guards';
import { CtxClient } from 'src/decoraters/ctx-user.decorator';




@Module({
  imports: [TypeOrmModule.forFeature([Clients]),
  JwtModule.register({ secret : "SINSALAMINALADINLABESDJIN" })
 ],
  providers: [ClientsService,ClientsResolver,JwtStrategy,GqlAuthGuard], 
  exports : [ClientsService,ClientsModule]
})
export class ClientsModule {}
