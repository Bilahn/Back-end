import { CreateMaidInput } from './create-maid.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMaidInput extends PartialType(CreateMaidInput) {
  @Field(() => Int)
  id: number;
}
