import { Injectable } from '@nestjs/common';
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
}
