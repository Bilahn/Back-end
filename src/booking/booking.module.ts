import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingResolver } from './booking.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { GqlAuthGuard } from 'src/guards/gql-auth.guards';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule } from 'src/clients/clients.module';




@Module({
  imports : [TypeOrmModule.forFeature([Booking]),
  ClientsModule,
  JwtModule.register({ secret : "SINSALAMINALADINLABESDJIN" })
 ],
  providers: [BookingResolver, BookingService,GqlAuthGuard,JwtStrategy]
})
export class BookingModule {}
