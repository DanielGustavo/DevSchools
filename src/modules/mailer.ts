import nodemailer, { TransportOptions } from 'nodemailer';
import { resolve } from 'path';

import mailerConfig from '../config/mailer';

import renderTemplateFile from '../utils/renderTemplateFile';

interface Template {
  filename: string;
  values?: {
    [key: string]: unknown;
  };
}

interface SendRequest {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  template?: Template;
}

class Mailer {
  private client = nodemailer.createTransport(mailerConfig as TransportOptions);

  public async send(request: SendRequest) {
    const { to, subject, text, template } = request;
    let { html } = request;

    if (template) {
      html = await renderTemplateFile({
        filePath: resolve(mailerConfig.templatesDir, template.filename),
        values: template.values,
      });
    }


    return this.client.sendMail({
      to,
      subject,
      text,
      html,
      from: mailerConfig.from,
    });
  }
}

export default new Mailer();
