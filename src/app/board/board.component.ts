import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Board, BoardChangeListener} from '../../logic/board';
import {FieldClickEvent} from '../field/field.component';
import {Field, FieldMeta} from '../../logic/field';

@Component({
  selector: 'app-board',
  template: `
    <table [style.width]="width + 'px'" [style.height]="height + 'px'">
      <tbody>
        <tr *ngFor="let fieldY of localFields; index as y">
          <td *ngFor="let field of fieldY; index as x">
            <app-field
                [State]="field.field"
                [Meta]="field.meta"
                [X]="x" [Y]="y"
                (fieldClicked)="fieldClickListened($event)">
            </app-field>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [`

    table {
      empty-cells: show;
    }

    td {
      border-left: 1px solid #73AD21;
      border-top: 1px solid #73AD21;
      vertical-align: center;
      justify-content: center;
      align-content: center;
    }

    app-field {
      display: block;
      width: 100%;
      height: 100%;
      text-align: center;
    }

  `]
})
export class BoardComponent implements OnInit, OnDestroy, BoardChangeListener {

  private board: Board;

  @Input() width = 1000;
  @Input() height = 650;

  /**
   * Local copy of the board fields
   */
  localFields: Array<Array<FieldWithMeta>>;

  constructor() {
    this.board = new Board(35, 25);
    this.localFields = [[]];
    for (let i = 0; i < this.board.sizeY; i++) {
      this.localFields[i] = [];
      for (let j = 0; j < this.board.sizeX; j++) {
        this.localFields[i][j] = new FieldWithMeta(Field.Empty, new FieldMeta());
      }
    }
  }

  ngOnInit(): void {
    this.board.registerListener(this);
  }

  ngOnDestroy(): void {
    this.board.removeListener(this);
  }

  fieldClickListened(stuff: FieldClickEvent): void {
    this.board.set(stuff.X, stuff.Y, Field.Cross);
  }

  onFieldChange(x: number, y: number, field: Field, meta: FieldMeta): void {
    this.localFields[y][x] = new FieldWithMeta(field, meta);
  }

}

class FieldWithMeta {

  field: Field;
  meta: FieldMeta;

  constructor(field: Field, meta: FieldMeta) {
    this.field = field;
    this.meta = meta;
  }

}

