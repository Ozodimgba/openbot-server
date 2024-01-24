import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  ping(): string {
    return 'This is the Openbook bot server. We use it to run modular tasks';
  }
}
