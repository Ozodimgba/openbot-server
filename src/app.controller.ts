import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CrankService } from './services/crank.service';
import { WalletService } from './services/walllet.service';
import { client } from './instance/redis';
import { generateKey, encrypt, decrypt } from './helpers/generateIV';
import { Request } from 'express';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

type UserPublicKey = {
  publicKey: string;
};

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly crankService: CrankService,
    private readonly walletService: WalletService,
    private configService: ConfigService,
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

  @Post('/create-wallet')
  async createWallet(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Req() request: Request,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() body: any,
  ): Promise<UserPublicKey> {
    try {
      //add the user ID instance
      console.log(body);
      //console.log(Buffer.from(this.configService.get<string>('IV')));
      const password = this.configService.get<string>('PASSWORD');
      const salt = this.configService.get<string>('SALT');

      const wallet = this.walletService.createWallet();
      const pKey: string = wallet.privateKey;
      const pubKey: string = wallet.publicKey;

      const iv = Buffer.from(this.configService.get<string>('IV'), 'hex');
      const key = await generateKey(password, salt);
      const encryptPrivKey = encrypt(pKey, key, iv);

      // Key representing the Redis list
      const userListKey = 'users';

      //hash the id
      const id = this.appService.hash(body.id);
      //store private key with user instance in separate databases
      const userInstance = {
        user: id,
        pubKey,
        privateKey: encryptPrivKey,
      };

      const jsonString = JSON.stringify(userInstance);
      // console.log(this.appService.hash('user-id'));

      //function to check if user is in the list already, if false push
      await client
        .rpush(userListKey, jsonString)
        .then(() => {
          console.log('User Instance pushed into the Redis list');
        })
        .catch((error) => {
          console.error('Error pushing user into Redis list:', error);
        });
      //console.log('pkey: ' + pKey);
      //console.log(encryptPrivKey);

      return { publicKey: pubKey };
    } catch (error) {
      // Handle the error here
      console.error('Error in createWallet:', error);
      // You might want to throw the error again or handle it appropriately based on your application's requirements.
      throw error;
    }
  }

  @Get('/get-wallet')
  async getWallet(): Promise<string> {
    //console.log(Buffer.from(this.configService.get<string>('IV')));
    const password = this.configService.get<string>('PASSWORD');
    const salt = this.configService.get<string>('SALT');
    //fetch the key storage using the userKey
    const pKey: string =
      'd2856adba78bf8b28f579e7212b90395ac62c3f1db13742cbe65a4336b1060ce3ea67620dffb9f3591c148a1e5f1b8c544a57927c97a3dd3db906eab617e3fd6b1ec757d2ee7a02943e3a8e75d16141c39622cb9fb5312cb';

    const iv = Buffer.from(this.configService.get<string>('IV'), 'hex');
    const key = await generateKey(password, salt);
    const decryptWallet = decrypt(pKey, key, iv);

    //store private key with user instance in seperate databases
    console.log(decryptWallet);

    return 'suceess';
  }
}
