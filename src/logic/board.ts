import {Field, FieldMeta} from './field';

export class Board {

  readonly sizeX: number;
  readonly sizeY: number;

  fields: Field[];
  fieldMetas: FieldMeta[];

  constructor(sizeX: number, sizeY: number) {

    const numberOfFields = sizeX * sizeY;

    this.sizeX = sizeX;
    this.sizeY = sizeY;

    this.fields = [];
    this.fieldMetas = [];

    for (let i = 0; i < numberOfFields; i++) {
      this.fields[i] = Field.Empty;
      this.fieldMetas[i] = new FieldMeta();
    }

  }

  get(x: number, y: number): Field {
    return this.fields[this.positionToIndex(x, y)];
  }

  getFieldMeta(x: number, y: number): FieldMeta {
    return this.fieldMetas[this.positionToIndex(x, y)];
  }

  set(x: number, y: number, field: Field): void {
    this.fields[this.positionToIndex(x, y)] = field;
  }

  private positionToIndex(x: number, y: number): number {
    if (x >= this.sizeX) {
      throw new Error('X=' + x + ' out of range >= ' + this.sizeX);
    }
    if (y >= this.sizeY) {
      throw new Error('Y=' + y + ' out of range >= ' + this.sizeY);
    }
    return y * this.sizeX + x;
  }

}
