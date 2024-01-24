import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CrankService } from './services/crank.service';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, CrankService],
})
export class AppModule {}
