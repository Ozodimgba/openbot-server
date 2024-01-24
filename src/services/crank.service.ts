import { Injectable } from '@nestjs/common';

@Injectable()
export class CrankService {
  healthcheck(): string {
    return 'The cranker service is is okay';
  }
}
