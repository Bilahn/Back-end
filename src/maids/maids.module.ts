import { Module } from '@nestjs/common';
import { MaidsService } from './maids.service';
import { MaidsResolver } from './maids.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Maid } from './entities/maid.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Maid])],
  providers: [MaidsResolver, MaidsService]
})
export class MaidsModule {}
