import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';

const ENCODING = 'hex';
const SEPARATOR = '|';
const ALGORITHM = 'aes-256-gcm';

export function encrypt(text: string, key: Buffer): string {
  const iv = randomBytes(16);
  const cipher = createCipheriv(ALGORITHM, key, iv);
  let encrypted = cipher.update(text, 'utf-8', ENCODING);
  encrypted += cipher.final(ENCODING);

  const tag = cipher.getAuthTag();
  return [encrypted, iv.toString(ENCODING), tag.toString(ENCODING)].join(SEPARATOR);
}

export function decrypt(text: string, key: Buffer): string {
  const [encryptedText, iv, tag] = text.split(SEPARATOR).map(part => Buffer.from(part, ENCODING));
  const decipher = createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(tag);

  const output = Buffer.concat([decipher.update(encryptedText), decipher.final()]).toString('utf-8');
  return output;
}