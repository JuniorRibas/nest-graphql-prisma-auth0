import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpGuard } from './auth/http.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(HttpGuard)
  getHello(): Promise<any> {
    return this.appService.getHello();
  }
}
