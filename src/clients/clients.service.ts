import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clients } from './clients.entity';
import { CreateClientsInput } from './dto/create-clients.input';
import * as  bcrypt from "bcrypt" ; 
import { LoginClientsInput } from './dto/login-clients.input';


@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Clients) private clientsRepository: Repository<Clients>,
  ) {}



  async getClientByEmail(email : string) : Promise <Clients> | undefined {
    return this.clientsRepository.findOne({email : email})
  }




  async register(createClientInput: CreateClientsInput): Promise<any> {
    const foundUser = await this.clientsRepository.findOne({username : createClientInput.username})
    if(foundUser){
      return new ConflictException('User already exists try with another username')
    }
    if(createClientInput.password !== createClientInput.confirmPassword){
      return new ForbiddenException('Passwords dosent matches try to focus please!')
    }
    else {
      const hashedPassword = await bcrypt.hash(createClientInput.password,12); 
      const newUser = await this.clientsRepository.create({...createClientInput,password : hashedPassword});
      
      return this.clientsRepository.save(newUser)
    }
  }

  async login(loginClientsInput : LoginClientsInput) : Promise<any> {
    const user = await this.clientsRepository.findOne({email : loginClientsInput.email})
    if(user){
     const isPasswordMatching = await bcrypt.compare(loginClientsInput.password,user.password)
        if(isPasswordMatching){
          return 'Log In successfully!'
        }
        else {
          return 'wrong password try again!'
        }
    }
    else {
      return 'Try to register please!'
    }
  }














  
}
