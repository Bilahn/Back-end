import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateMaidInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
