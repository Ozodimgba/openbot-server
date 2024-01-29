import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

// Function to generate a key using scrypt
export async function generateKey(
  password: string,
  salt: string,
): Promise<Buffer> {
  const keyLength = 32; // AES-256 key length
  return promisify(scrypt)(password, salt, keyLength) as Promise<Buffer>;
}

// Function to encrypt text
/**
 * This encrypts password with special IVs and passwords before storing them in the database
 * @param data - To encrypt; string
 * @param key - the derivative of the salt and the password
 * @param iv
 * @returns
 */
export function encrypt(text: string, key: Buffer, iv: Buffer): string {
  const cipher = createCipheriv('aes-256-ctr', key, iv);
  const encryptedText = Buffer.concat([
    cipher.update(text, 'utf-8'),
    cipher.final(),
  ]);
  return encryptedText.toString('hex');
}

// Function to decrypt text
export function decrypt(encryptedHex: string, key: Buffer, iv: Buffer): string {
  const decipher = createDecipheriv('aes-256-ctr', key, iv);
  const encryptedText = Buffer.from(encryptedHex, 'hex');
  const decryptedText = Buffer.concat([
    decipher.update(encryptedText),
    decipher.final(),
  ]);
  return decryptedText.toString('utf-8');
}

async () => {
  const password = 'your_password';
  const salt = 'your_salt';

  const key = await generateKey(password, salt);
  const iv = randomBytes(16);

  // Encryption
  const textToEncrypt = 'Nest';
  const encryptedText = encrypt(textToEncrypt, key, iv);
  console.log('Encrypted Text:', encryptedText);

  // Decryption
  const decryptedText = decrypt(encryptedText, key, iv);
  console.log('Decrypted Text:', decryptedText);
};
