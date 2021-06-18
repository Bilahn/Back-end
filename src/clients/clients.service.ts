import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clients } from './clients.entity';
import { CreateClientsInput } from './dto/create-clients.input';
import * as  bcrypt from "bcrypt" ; 
import { LoginClientsInput } from './dto/login-clients.input';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './userToken.entity';
import { JwtDto } from './dto/jwt.dto';



@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Clients) private clientsRepository: Repository<Clients>,
    private readonly jwtService : JwtService
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

  async login(loginClientsInput : LoginClientsInput) : Promise<UserToken>{
    const user = await this.clientsRepository.findOne({email : loginClientsInput.email})
  

    if(user){
      
     const isPasswordMatching = await bcrypt.compare(loginClientsInput.password,user.password)
        if(isPasswordMatching){
          // const payload = { email : user.email , username : user.username }
          // const token = this.jwtService.sign(payload)
          // return token 
         const token = await this.signToken(user.id)
          return {client : user ,  token : token}
        }
        else {
          throw new Error('Invalid Password')
        }
    }
    else {
      throw new NotFoundException(`User with email ${loginClientsInput.email} does not exist`)
    }
  }

   signToken(id : number) {
    const payload : JwtDto = { clientId : id }
    return this.jwtService.sign(payload)
  }

  async validateClient(clientId : number) {
    return this.clientsRepository.findOne({ id : clientId})
  }
  
}
