export function validateToken(token: string) {
  if (!token) return false;

  const [header, payload, signature] = token.split('.');

  if (!header || !payload || !signature) {
    return false;
  }

  const payloadInBase64 = token.split('.')[1];
  const decodedPayload = atob(payloadInBase64);

  const { exp: expirationTimestamp } = JSON.parse(decodedPayload);

  if (!expirationTimestamp) return true;

  const timestamp = Math.floor(new Date().getTime() / 1000);

  const tokenExpired = expirationTimestamp <= timestamp;

  if (tokenExpired) {
    return false;
  }

  return true;
}
