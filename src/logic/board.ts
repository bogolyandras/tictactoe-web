import {Field, FieldMeta} from './field';

export class Board {

  readonly sizeX: number;
  readonly sizeY: number;

  readonly fields: Field[];
  readonly fieldMetas: FieldMeta[];

  private lastFieldX = -1;
  private lastFieldY = -1;

  private listeners = new Set<BoardChangeListener>();

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
    if (this.lastFieldChangeActivated()) {
      this.fieldMetas[this.positionToIndex(this.lastFieldX, this.lastFieldY)].recentlyChecked = false;
      this.listeners.forEach(listener => listener.onFieldChange(
        this.lastFieldX, this.lastFieldY,
        this.fields[this.positionToIndex(this.lastFieldX, this.lastFieldY)],
        this.fieldMetas[this.positionToIndex(this.lastFieldX, this.lastFieldY)]
      ));
    }

    this.fields[this.positionToIndex(x, y)] = field;
    this.fieldMetas[this.positionToIndex(x, y)].recentlyChecked = true;
    this.listeners.forEach(listener => listener.onFieldChange(x, y, field, this.fieldMetas[this.positionToIndex(x, y)]));

    this.lastFieldX = x;
    this.lastFieldY = y;
  }

  registerListener(listener: BoardChangeListener): void {
    this.listeners.add(listener);
  }

  removeListener(listener: BoardChangeListener): void {
    this.listeners.delete(listener);
  }

  private lastFieldChangeActivated(): boolean {
    return this.lastFieldX > -1 && this.lastFieldY > -1;
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

export interface BoardChangeListener {

  onFieldChange(x: number, y: number, field: Field, meta: FieldMeta): void;

}
