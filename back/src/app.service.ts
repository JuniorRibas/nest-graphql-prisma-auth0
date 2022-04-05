import { Injectable } from '@nestjs/common';
import { PrismaService } from './database/prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getHello(): Promise<any> {
    return this.prisma.cliente.findMany();
  }
}
