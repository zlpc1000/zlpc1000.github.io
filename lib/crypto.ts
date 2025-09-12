import CryptoJS from 'crypto-js';

export class DarkCrypto {
  private static readonly ALGORITHM = 'AES';
  private static readonly KEY_SIZE = 256;
  private static readonly IV_SIZE = 16;

  /**
   * Gera uma chave de criptografia aleatória
   */
  static generateKey(): string {
    return CryptoJS.lib.WordArray.random(this.KEY_SIZE / 8).toString();
  }

  /**
   * Gera um IV (Initialization Vector) aleatório
   */
  static generateIV(): string {
    return CryptoJS.lib.WordArray.random(this.IV_SIZE).toString();
  }

  /**
   * Criptografa dados com AES-256
   */
  static encrypt(data: string, key: string, iv?: string): { encrypted: string; iv: string } {
    const ivToUse = iv || this.generateIV();
    const keyWordArray = CryptoJS.enc.Hex.parse(key);
    const ivWordArray = CryptoJS.enc.Hex.parse(ivToUse);
    
    const encrypted = CryptoJS.AES.encrypt(data, keyWordArray, {
      iv: ivWordArray,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return {
      encrypted: encrypted.toString(),
      iv: ivToUse
    };
  }

  /**
   * Descriptografa dados com AES-256
   */
  static decrypt(encryptedData: string, key: string, iv: string): string {
    const keyWordArray = CryptoJS.enc.Hex.parse(key);
    const ivWordArray = CryptoJS.enc.Hex.parse(iv);
    
    const decrypted = CryptoJS.AES.decrypt(encryptedData, keyWordArray, {
      iv: ivWordArray,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  /**
   * Gera hash SHA-256 para identificadores únicos
   */
  static hash(data: string): string {
    return CryptoJS.SHA256(data).toString();
  }

  /**
   * Gera um ID único e anônimo
   */
  static generateAnonymousId(): string {
    const timestamp = Date.now().toString();
    const random = Math.random().toString();
    return this.hash(timestamp + random).substring(0, 16);
  }

  /**
   * Criptografa email completo com metadados
   */
  static encryptEmail(emailData: {
    to: string;
    subject: string;
    body: string;
    from?: string;
  }): { encrypted: string; key: string; iv: string; id: string } {
    const key = this.generateKey();
    const iv = this.generateIV();
    const id = this.generateAnonymousId();
    
    const emailJson = JSON.stringify(emailData);
    const { encrypted } = this.encrypt(emailJson, key, iv);
    
    return { encrypted, key, iv, id };
  }

  /**
   * Descriptografa email completo
   */
  static decryptEmail(encrypted: string, key: string, iv: string): {
    to: string;
    subject: string;
    body: string;
    from?: string;
  } {
    const decrypted = this.decrypt(encrypted, key, iv);
    return JSON.parse(decrypted);
  }
}
