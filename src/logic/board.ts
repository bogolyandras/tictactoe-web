
export enum Field {

  Cross,
  Naught,
  Empty

}

export class Board {

  readonly sizeX: number;
  readonly sizeY: number;

  fields: Field[];

  constructor(sizeX: number, sizeY: number) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    const numberOfFields = sizeX * sizeY;
    this.fields = [numberOfFields];
    for (let i = 0; i < numberOfFields; i++) {
      this.fields[i] = Field.Empty;
    }
  }

  get(x: number, y: number): Field {
    return this.fields[this.positionToIndex(x, y)];
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
