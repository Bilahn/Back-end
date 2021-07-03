import { Resolver, Query, Mutation, Args, Int , Subscription } from '@nestjs/graphql';
import { BookingService } from './booking.service';
import { Booking } from './entities/booking.entity';
import { CreateBookingInput } from './dto/create-booking.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../guards/gql-auth.guards'
import { CtxClient } from 'src/decoraters/ctx-user.decorator';
import { Clients } from 'src/clients/clients.entity';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub()

@Resolver(() => Booking)
export class BookingResolver {
  constructor(private readonly bookingService: BookingService) {}

  
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Booking)
  createBooking(@Args('createBookingInput') createBookingInput: CreateBookingInput, @CtxClient() client : Clients) {
    // pubsub.publish('bookingAdded' , { bookingAdded : createBookingInput })
    console.log("thebooknig",createBookingInput)
    let payload = {...createBookingInput, client}
    return this.bookingService.create(payload);
  }

  // @UseGuards(GqlAuthGuard,)
  @Query(() => [Booking], { name: 'booking' })
  findAll() {
    return this.bookingService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Booking], { name: 'bookingByClient' })
  findByClient(@CtxClient() client : Clients) {
    console.log(client)
    return this.bookingService.findByClient(client.id)
  }

  
  @Subscription(()=>Booking)
  bookingAdded(){
    return pubsub.asyncIterator('bookingAdded')
  }
}
