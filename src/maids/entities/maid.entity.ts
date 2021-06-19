import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Maid {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  lastname: string;

  @Column()
  @Field({ nullable: true })
  salary?: number;

  @Column()
  @Field({ nullable: true })
  email?: string;
  @Column()
  @Field()
  Available: boolean;
}
