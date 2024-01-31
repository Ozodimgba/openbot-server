/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Cluster,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  clusterApiUrl,
} from '@solana/web3.js';
import { AnchorProvider, BN, Wallet } from '@coral-xyz/anchor';
import { RPC, programId } from './index';
import { Logger } from 'tslog';
import { error } from 'console';
//change to local client
import { MarketAccount, OpenBookV2Client } from './ts/client/src';

// Assuming this is a function that you'll implement for your CrankService
export default async function cranker(
  keypair: Keypair,
  marketId: string,
  consumeEventLimit?: number,
  user_cluster?: Cluster,
): Promise<void> {
  // Implement your logic here
  const wallet = new Wallet(keypair);
  //convert key string to json add funtion to utils
  //const wallet = new Wallet();

  const log = new Logger({ name: 'openbook-cranker-V2', minLevel: 1 });
  const cluster = user_cluster || 'devnet';
  const limit = new BN(consumeEventLimit || 7);
  const market = marketId || 'GmTDUTmgYsRLdYNPueUwxFYkfC37gBawYftjG3tmJmbWh';

  if (!user_cluster) {
    log.warn('Cluster is not set, using fallback devnet cluster');
  }

  const provider = new AnchorProvider(
    new Connection(clusterApiUrl(user_cluster)),
    wallet,
    {
      commitment: 'confirmed',
    },
  );

  log.info('Cranking by: ' + wallet.publicKey.toBase58());

  const balance: number | any = await provider.connection.getBalance(
    wallet.publicKey,
  );

  log.info('BALANCE: ' + balance / LAMPORTS_PER_SOL + ' SOL');

  const client = new OpenBookV2Client(provider, programId);

  const marketPubkey = new PublicKey(marketId);
  log.info('CRANKING MARKET: ' + marketPubkey.toBase58());

  const marketObject = await client.getMarket(marketPubkey);

  if (!marketObject) {
    throw 'No market';
  }

  const events = await client.getEventHeap(marketObject.eventHeap);

  const remainingAccts: PublicKey[] =
    await client.getAccountsToConsume(marketObject);

  if (remainingAccts.length > 0) {
    const tx = await client.consumeEvents(
      marketPubkey,
      marketObject,
      limit,
      remainingAccts,
    );
    log.info('Signature: ' + tx);
  }
}
