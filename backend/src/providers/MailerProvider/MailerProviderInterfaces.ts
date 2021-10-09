export interface Template {
  filename: string;
  values?: {
    [key: string]: unknown;
  };
}

export interface SendRequest {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  attachmentsFilenames?: string[];
  template?: Template;
}

export default interface MailerProvider {
  send(params: SendRequest): Promise<unknown>;
}
