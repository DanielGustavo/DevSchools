import MailerProvider, { SendRequest } from './MailerProviderInterfaces';

class MockMailerProvider implements MailerProvider {
  public async send(request: SendRequest) {
    console.log('Sending email 📬...');

    return request;
  }
}

export default new MockMailerProvider();
