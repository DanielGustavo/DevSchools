import nodemailer from 'nodemailer';

import mailerConfig from '../config/mailer';

interface SendRequest {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

class Mailer {
  private config = mailerConfig as nodemailer.TransportOptions;

  public client = nodemailer.createTransport(this.config);

  public send = async (request: SendRequest) => {
    const { to, subject, text, html } = request;

    return this.client.sendMail({
      to,
      subject,
      text,
      html,
      from: mailerConfig.from,
    });
  };
}

export default new Mailer();
