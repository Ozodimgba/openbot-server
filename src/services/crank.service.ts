import { Injectable } from '@nestjs/common';
//import { client } from 'src/instance/redis';

@Injectable()
export class CrankService {
  healthcheck(): string {
    return 'The cranker service is is okay';
  }

  getWallet(): any {
    //client.get('',)
  }

  cranker(user: string, marketId: string): any {
    // get cluster instance
    console.log(user, marketId);
  }
}
