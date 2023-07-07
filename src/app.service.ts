import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(){}

  async createRandomNumber() {
    return Math.floor(100000 + Math.random() * 900000);
  }
}
