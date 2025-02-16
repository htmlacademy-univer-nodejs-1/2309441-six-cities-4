import {TsvFileReader} from '../../shared/libs/tsv-file-reader.ts';

import {Command} from './command.interface.js';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [filename] = parameters;
    const fileReader = new TsvFileReader(filename.trim());

    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (error) {
      if (!(error instanceof Error)){
        throw error;
      }

      console.error(`Can't import data from file ${filename}`);
      console.error(`Details: ${error.message}`);
    }
  }
}
