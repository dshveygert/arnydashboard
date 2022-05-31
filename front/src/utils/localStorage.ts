import {AES, enc, SHA256, lib} from 'crypto-js';
import {environment} from "../environments/environment";

export function localStorageGetItem(key: string, crypto: CryptoData): string | null {
  try {
    return environment.production ? crypto.decrypt(localStorage.getItem(key)): localStorage.getItem(key);
  } catch (e: any) {
    if (e.name === 'NS_ERROR_FILE_CORRUPTED') {
      localStorage.removeItem(key);
    }
  }
  return null;
}

export function localStorageSetItem(key: string, data: string, crypto: CryptoData): void {
  try {
    const d = environment.production ? crypto.encrypt(data) : data;
    localStorage.setItem(key, d);
  } catch (e: any) {
    if (e.name === 'NS_ERROR_FILE_CORRUPTED') {
      localStorage.removeItem(key);
    }
  }
}

export function localStorageRemoveItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (e) {
  }
}

export class CryptoData {
  private readonly _secretKey: string;
  private readonly _timestamp: string;

  get secretKey(): string {
    return this._secretKey;
  }

  private generateKey(salt: string): string {
    const {language, appName} = window.navigator ?? {};
    const key = [language, appName, salt].join('');
    return SHA256(key).toString();
  }

  private bytes = (data: string): lib.WordArray => AES.decrypt(data.trim(), this.secretKey);
  encrypt = (data: any): string => AES.encrypt(JSON.stringify(data), this.secretKey).toString();
  decrypt<T>(data: string | null): T {
    try {
      return typeof data === 'string' && JSON.parse(this.bytes(data).toString(enc.Utf8));
    } catch (e: any) {
      console.error(`${e.message}\n`);
    }
    return {} as T;
  }

  constructor(salt = 'salt') {
    this._secretKey = this.generateKey(salt);
    this._timestamp = (Math.floor(Date.now() / 1000)).toString();
  }
}
