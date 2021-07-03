import { ConflictException, ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clients } from './clients.entity';
import { CreateClientsInput } from './dto/create-clients.input';
import * as  bcrypt from "bcrypt" ; 
import { LoginClientsInput } from './dto/login-clients.input';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './userToken.entity';




@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Clients) public clientsRepository: Repository<Clients>,
    private readonly jwtService : JwtService
  ) {}



  async getClientByEmail(email : string) : Promise <Clients> | undefined {
    return this.clientsRepository.findOne({email : email})
  }




  async register(createClientInput: CreateClientsInput): Promise<any> {
    const foundUser = await this.clientsRepository.findOne({email : createClientInput.email})
    if(foundUser){
      throw new ConflictException(`Hello Mr(s) ${createClientInput.name} you already have an account!`)
      
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
    const payload  = { clientId : id }
    return this.jwtService.sign(payload)
  }

  async validateClient(payload) {
    return this.clientsRepository.findOne(payload)
  }

  async findClientById(id){
    return this.clientsRepository.findOne({id : id})
  }

  async updateById(id,clientInput){
  const newuser = await  this.clientsRepository.update({id : id }, {
    name : clientInput.name , 
    email : clientInput.email , 
    phoneNumber : clientInput.phoneNumber
  })
  return "DONE"
  }

  async findAll(){
    return this.clientsRepository.find()
  }
  
}
