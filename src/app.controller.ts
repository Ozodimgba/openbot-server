import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CrankService } from './services/crank.service';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly crankService: CrankService,
  ) {}

  @Get()
  check(): string {
    return this.appService.ping();
  }

  @Post('/crank')
  crank(@Req() req: Request, @Body() body: any): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const requestData = {
      method: req.method,
      url: req.url,
      headers: req.headers,
      body: req.body,
    };

    console.log(body);
  }
}
