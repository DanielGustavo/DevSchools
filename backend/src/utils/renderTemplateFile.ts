import handlebars from 'handlebars';
import { promises as fs } from 'fs';

interface Request {
  filePath: string;
  values?: {
    [key: string]: unknown;
  };
}

export default async function renderTemplateFile({
  filePath,
  values,
}: Request) {
  const fileString = await fs.readFile(filePath, 'utf-8');

  const template = handlebars.compile(fileString);
  const result = template(values);

  return result;
}
