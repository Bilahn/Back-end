import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { BookingModule } from './booking/booking.module';
import { GoogleStrategy } from './strategy/google.strategy';
// import { FacebookStrategy } from './strategy/facebook.strategy'







@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'bilahn',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      installSubscriptionHandlers: true,
     // context : ({req}) => ({ headers : req.headers })
    })
    ,ClientsModule, BookingModule],
  controllers: [AppController],
  providers: [AppService,GoogleStrategy],
})
export class AppModule {}
 