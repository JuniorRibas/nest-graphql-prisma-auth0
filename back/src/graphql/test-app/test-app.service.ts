import { Injectable } from '@nestjs/common';
import { Query } from '@nestjs/graphql';

@Injectable()
export class TestAppService {
  @Query(() => String)
  async getHellou() {
    return 'Teste GraphQL :)';
  }
}
