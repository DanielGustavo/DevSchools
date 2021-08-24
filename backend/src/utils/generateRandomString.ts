import crypto from 'crypto';

export default function generateRandomString(stringSize = 10) {
  return crypto.randomBytes(stringSize / 2).toString('hex');
}
