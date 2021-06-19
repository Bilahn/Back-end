import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BookingService } from './booking.service';
import { Booking } from './entities/booking.entity';
import { CreateBookingInput } from './dto/create-booking.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../guards/gql-auth.guards'
import { CtxClient } from 'src/decoraters/ctx-user.decorator';
import { Clients } from 'src/clients/clients.entity';

@Resolver(() => Booking)
export class BookingResolver {
  constructor(private readonly bookingService: BookingService) {}

  
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Booking)
  createBooking(@Args('createBookingInput') createBookingInput: CreateBookingInput, @CtxClient() client : Clients) {
    console.log(createBookingInput)
    let payload = {...createBookingInput,client,clientId : client.id}
    return this.bookingService.create(payload);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Booking], { name: 'booking' })
  findAll(@CtxClient() client : Clients ) {
    console.log(client)
    return this.bookingService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Booking], { name: 'bookingByClient' })
  findByClient(@CtxClient() client : Clients) {
    return this.bookingService.findByClient(client.id)
  }

  // @Query(() => Booking, { name: 'booking' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.bookingService.findOne(id);
  // }

  // @Mutation(() => Booking)
  // updateBooking(@Args('updateBookingInput') updateBookingInput: UpdateBookingInput) {
  //   return this.bookingService.update(updateBookingInput.id, updateBookingInput);
  // }

  // @Mutation(() => Booking)
  // removeBooking(@Args('id', { type: () => Int }) id: number) {
  //   return this.bookingService.remove(id);
  // }
}
