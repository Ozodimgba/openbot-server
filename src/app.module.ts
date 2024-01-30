import { Module } from '@nestjs/common';
import { ConfigAppModule } from './config.module';
import { AppController } from './app.controller';
import { CrankService } from './services/crank.service';
import { WalletService } from './services/walllet.service';
import { MarketService } from './services/market.service';
import { AppService } from './app.service';

@Module({
  imports: [ConfigAppModule],
  controllers: [AppController],
  providers: [AppService, CrankService, WalletService, MarketService],
})
export class AppModule {}
