import {Component, OnDestroy, OnInit} from '@angular/core';
import {Board, BoardChangeListener} from '../../logic/board';
import {FieldClickEvent} from '../field/field.component';
import {Field, FieldMeta} from '../../logic/field';

@Component({
  selector: 'app-board',
  template: `
    <div>
      <ul>
        <li *ngFor="let fieldY of localFields; index as y">
          <ul>
            <li [class.field]="field" *ngFor="let field of fieldY; index as x">
              <app-field
                [State]="field.field"
                [Meta]="field.meta"
                [X]="x" [Y]="y"
                (fieldClicked)="fieldClickListened($event)">
              </app-field>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  `,
  styles: [`
    div {
      position: absolute;
    }
    * {
      margin: 0;
      padding: 0;
    }
    ul {
      list-style-type: none;
    }
    li.field {
      display: inline-block;
      width: 32px;
      height: 32px;
      border-left: 1px solid #73AD21;
      border-top: 1px solid #73AD21;
    }
  `]
})
export class BoardComponent implements OnInit, OnDestroy, BoardChangeListener {

  board: Board;

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
    console.log('registered');
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

