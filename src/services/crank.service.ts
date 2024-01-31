import { Injectable } from '@nestjs/common';
import Search from 'src/utils/search';
import cranker from 'src/utils/crank';
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
    // get user keypair
    const search = new Search();

    const getCluster = search.findCluster(user);
    const userInstance = search.searchUser(user);

    console.log(userInstance, getCluster);
    //get keypair from user instance
    // parse the key pair to a usable type

    //getCluster...if true then mainnet write logic

    //user settings under user instance settings: {} to get cluster

    cranker(keypair, marketId, consumeEventLimit, user_cluster);
    console.log(user, marketId);
  }
}
