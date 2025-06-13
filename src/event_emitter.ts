import { EventEmitter } from 'node:events';
import { readFile } from 'node:fs';

export const EVENT = {
  FILE_READ: 'file_read',
  FOUND: 'found',
  ERROR: 'error'
};

export class TextSearch extends EventEmitter {
  private files: Array<string>;
  private keyword: RegExp;

  constructor(keyword: RegExp) {
    super();
    this.files = [];
    this.keyword = new RegExp(keyword);
  }

  addFile(file: string): TextSearch {
    this.files.push(file);
    return this;
  }

  search(): TextSearch {
    for (const file of this.files) {
      readFile(file, 'utf8', (err, data) => {
        if (err) {
          this.emit(EVENT.ERROR, err);
        }

        this.emit(EVENT.FILE_READ, file);

        const match = data.match(this.keyword);
        if (match) {
          match.forEach(elem => this.emit(EVENT.FOUND, file, elem))
        } else {
          this.emit(EVENT.FOUND, file, null);
        }
      });
    }

    return this;
  }
}
