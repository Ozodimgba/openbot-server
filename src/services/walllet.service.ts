import { Injectable } from '@nestjs/common';
import { Keypair } from '@solana/web3.js';
// import { client } from '../instance/redis';
import { encode } from 'bs58';

@Injectable()
export class WalletService {
  healthCheck(): string {
    return 'Wallet services are A-Okay!';
  }

  createWallet(): { publicKey: string; privateKey: string } {
    //receive user profile instance
    const wallet = Keypair.generate();

    const publicKey = wallet.publicKey.toBase58();
    const privateKey = encode(wallet.secretKey);

    // client.set('privateKey', privateKey);
    return { publicKey, privateKey };
  }
}
