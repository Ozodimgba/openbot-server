import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Keypair } from '@solana/web3.js';
// import { client } from '../instance/redis';

@Injectable()
export class MarketService {
  healthCheck(): string {
    return 'Wallet services are A-Okay!';
  }

  placeOrder(): any {}

  createMarket(): any {}

  closeMarket(): any {}
}
