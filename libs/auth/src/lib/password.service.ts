import bcrypt = require('bcrypt');
import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordService {
  /**
   * @param {string} password
   * @returns {Promise<string>} password hash
   */
  public async hash(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 10);

    return hash;
  }

  /**
   * @param {string} password
   * @param {string} hash
   * @returns {Promise<boolean>} compare result
   */
  public async compare(password: string, hash: string): Promise<boolean> {
    const isCorrect = await bcrypt.compare(password, hash);

    return isCorrect;
  }
}
