import { Injectable } from '@nestjs/common';
import { Maid } from './entities/maid.entity';
import { CreateMaidInput } from './dto/create-maid.input';
import { UpdateMaidInput } from './dto/update-maid.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MaidsService {
  constructor(
    @InjectRepository(Maid) private maidsRepository: Repository<Maid>,
  ) {}

  async findAll(): Promise<Maid[]> {
    return this.maidsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} maid`;
  }

  update(id: number, updateMaidInput: UpdateMaidInput) {
    return `This action updates a #${id} maid`;
  }

  remove(id: number) {
    return `This action removes a #${id} maid`;
  }
}
