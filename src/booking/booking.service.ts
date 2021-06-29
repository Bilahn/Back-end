import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookingInput } from './dto/create-booking.input';
import { Booking } from './entities/booking.entity';
@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking) private bookingRepository: Repository<Booking>,
  ) {}

  create(createBookingInput: CreateBookingInput) {
    console.log('here', createBookingInput);
    const newBooking = this.bookingRepository.create(createBookingInput);
    return this.bookingRepository.save(newBooking);
  }

  findAll() {
    return this.bookingRepository.find({relations: ['client']});
  }

  findByClient(clientId) {
    return this.bookingRepository.find({
      where: { 
        client: {
          id: clientId 
        } 
      },
      relations: ['client']
    });
  }
}
