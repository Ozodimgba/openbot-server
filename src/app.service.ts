import { Injectable } from '@nestjs/common';
import { client } from './instance/redis';
import crypto from 'crypto';

@Injectable()
export class AppService {
  ping(): string {
    return 'This is the Openbook bot server. We use it to run modular tasks';
  }

  hash(input: string): string {
    const hash = crypto.createHash('sha256').update(input).digest('hex');
    return hash;
  }

  async setMainet(user: string, state: boolean): Promise<boolean> {
    try {
      // Convert boolean to string before setting in Redis
      const value = state.toString();

      // Set key-value pairs for a hash
      await client.hset('cluster', user, value);
      return true;
    } catch (error) {
      console.error('Error setting value in Redis:', error);
      return false;
    }
  }
}
