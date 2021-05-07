import '../src/database';
import { getConnection } from 'typeorm';

async function wait(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

async function waitForDatabaseConnection() {
  const connection = getConnection();

  if (connection.isConnected === false) {
    await wait(500);
    await waitForDatabaseConnection();
  }
}

beforeAll(async () => {
  await waitForDatabaseConnection();
});
