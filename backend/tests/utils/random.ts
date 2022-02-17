import crypto from 'crypto';

export default function random(stringSize = 10) {
  return crypto.randomBytes(stringSize / 2).toString('hex');
}
