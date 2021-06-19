import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MaidsService } from './maids.service';
import { Maid } from './entities/maid.entity';
import { CreateMaidInput } from './dto/create-maid.input';
import { UpdateMaidInput } from './dto/update-maid.input';

@Resolver(() => Maid)
export class MaidsResolver {
  constructor(private maidsService: MaidsService) {}

  // @Mutation(() => Maid)
  // createMaid(@Args('createMaidInput') createMaidInput: CreateMaidInput) {
  //   return this.maidsService.create(createMaidInput);
  // }

  @Query(() => [Maid], { name: 'maids' })
  findAll() {
    return this.maidsService.findAll();
  }

  // @Query(() => Maid, { name: 'maid' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.maidsService.findOne(id);
  // }

  @Mutation(() => Maid)
  updateMaid(@Args('updateMaidInput') updateMaidInput: UpdateMaidInput) {
    return this.maidsService.update(updateMaidInput.id, updateMaidInput);
  }

  @Mutation(() => Maid)
  removeMaid(@Args('id', { type: () => Int }) id: number) {
    return this.maidsService.remove(id);
  }
}
