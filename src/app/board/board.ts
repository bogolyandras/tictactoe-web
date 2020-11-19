
export enum Field {

  X,
  O,
  Empty

}

export class ImmutableBoard {

  sizeX: number;
  sizeY: number;

  fields: Field[];

  constructor(sizeX: number, sizeY: number) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.fields = [sizeX * sizeY];
  }

  get(x: number, y: number): Field {
    return this.fields[this.positionToIndex(x, y)];
  }

  protected positionToIndex(x: number, y: number): number {
    if (x >= this.sizeX) {
      throw new Error('X=' + x + ' out of range >= ' + this.sizeX);
    }
    if (y >= this.sizeY) {
      throw new Error('Y=' + y + ' out of range >= ' + this.sizeY);
    }
    return y * this.sizeX + x;
  }

}

export class MutableBoard extends ImmutableBoard {

  set(x: number, y: number, field: Field): void {
    this.fields[this.positionToIndex(x, y)] = field;
  }

}
