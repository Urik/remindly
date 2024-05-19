import { randomBytes } from 'node:crypto';

import { describe, it, expect } from 'vitest';

import { encrypt, decrypt } from './encryption';

const KEY = Buffer.from('IG9R4s+Vo9YbP/AfmxhLERW8FU6VquJfd8GjqI2hg0E=', 'base64');

describe('Encryption', () => {
  it('should throw when encrypting with a key of 248 bits', () => {
    const invalidKey = randomBytes(31);
    expect(() => encrypt('test123', invalidKey)).toThrowError('Invalid key length');
  });

  it('should throw when encrypting with a key of 264 bits', () => {
    const invalidKey = randomBytes(33);
    expect(() => encrypt('test123', invalidKey)).toThrowError('Invalid key length');
  });

  it('should not throw when encrypting with a key of 256 bits', () => {
    expect(() => encrypt('test123', KEY)).not.toThrowError();
  });


  it('should be able to decrypt a string encrypted with the same key', () => {
    const encrypted = encrypt('I am a string', KEY);
    const decrypted = decrypt(encrypted, KEY);

    expect(decrypted).to.equal('I am a string');
  });

  it('should not be able to decrypt a string encrypted with a different key', () => {
    const encrypted = encrypt('I am a string', KEY);

    const randomKey = randomBytes(32);
    expect (() => decrypt(encrypted, randomKey)).toThrowError('Unsupported state or unable to authenticate data');
  });
});