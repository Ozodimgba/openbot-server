/* eslint-disable @typescript-eslint/no-unused-vars */
import * as fs from 'fs';
import {
  OpenBookV2Client,
  IDL,
  type OpenbookV2,
} from '@openbook-dex/openbook-v2';

import {
  Connection,
  Keypair,
  PublicKey,
  ComputeBudgetProgram,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';
import { bs58 } from '@coral-xyz/anchor/dist/cjs/utils/bytes';
import { AnchorProvider, BN, Program, getProvider } from '@coral-xyz/anchor';
import * as os from 'os';
import { decrypt, generateKey } from '../helpers/generateIV';
import dotenv from 'dotenv';
// import { createAccount } from "./solana_utils";
// import { MintUtils } from "./mint_utils";

dotenv.config();
// export const RPC = "http://127.0.0.1:8899";
export const RPC = 'https://api.devnet.solana.com';
// export const RPC= "https://api.testnet.solana.com";

export const programId = new PublicKey(
  'opnb2LAfJYbRMAHHvqjCwQxanZn7ReEHp1k81EohpZb',
);

// export async function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// export const authorityFile = `./wallet.json`;
// export const authority = getKeypairFromFile(authorityFile);
// export const connection = new Connection(RPC, {
//   commitment: 'finalized',
//   confirmTransactionInitialTimeout: 30000,
// });
// export const program = new Program<OpenbookV2>(IDL, programId, getProvider());

// export function getKeypairFromFile(filePath: string): Keypair {
//   return Keypair.fromSecretKey(
//     Uint8Array.from(
//       JSON.parse(
//         process.env.KEYPAIR || fs.readFileSync(filePath.toString(), 'utf-8'),
//       ),
//     ),
//   );
// }

export async function getKeypairFromEncryptedKey(
  encryptedKey: string,
): Promise<Keypair> {
  try {
    const iv = Buffer.from(process.env.IV, 'hex');
    const password = process.env.PASSWORD;
    const salt = process.env.SALT;

    const key = await generateKey(password, salt);
    const secretKey = decrypt(encryptedKey, key, iv);

    const base58Sk = bs58.decode(secretKey);
    const keypair = Keypair.fromSecretKey(base58Sk);

    return keypair;
  } catch (err) {
    return err;
  }
}
