import { Test, TestingModule } from '@nestjs/testing';
import { MaidsResolver } from './maids.resolver';
import { MaidsService } from './maids.service';

describe('MaidsResolver', () => {
  let resolver: MaidsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaidsResolver, MaidsService],
    }).compile();

    resolver = module.get<MaidsResolver>(MaidsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
