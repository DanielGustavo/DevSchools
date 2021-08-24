import nodemailer, { TransportOptions } from 'nodemailer';
import { resolve } from 'path';

import mailerConfig from '../../config/mailer';

import renderTemplateFile from '../../utils/renderTemplateFile';

import MailerProvider, { SendRequest } from './MailerProviderInterfaces';

class NodemailerProvider implements MailerProvider {
  private client = nodemailer.createTransport(mailerConfig as TransportOptions);

  public async send(request: SendRequest) {
    const { to, subject, text, template, attachmentsFilenames } = request;
    let { html } = request;

    if (template) {
      html = await renderTemplateFile({
        filePath: resolve(mailerConfig.templatesDir, template.filename),
        values: template.values,
      });
    }

    const attachments = attachmentsFilenames?.map((currentFilename) => {
      const filenameWithoutExtension = currentFilename.split('.')[0];

      return {
        filename: currentFilename,
        path: resolve(mailerConfig.attachmentsDir, currentFilename),
        cid: `devschools@${filenameWithoutExtension}`,
      };
    });

    return this.client.sendMail({
      to,
      subject,
      text,
      html,
      from: mailerConfig.from,
      attachments,
    });
  }
}

export default new NodemailerProvider();
