import {Component, OnInit} from '@angular/core';
import {Board} from '../../logic/board';
import {FieldClickEvent} from '../field/field.component';
import {Field} from '../../logic/field';

@Component({
  selector: 'app-board',
  template: `
    <ul>
      <li *ngFor="let fieldY of localFields; index as y">
        <ul>
          <li class="field" *ngFor="let field of fieldY; index as x">
            <app-field [State]="field" [X]="x" [Y]="y" (fieldClicked)="fieldClickListened($event)"></app-field>
          </li>
        </ul>
      </li>
    </ul>
  `,
  styles: [`
    * {
      margin: 0;
      padding: 0;
    }
    ul {
      list-style-type: none;
    }
    li.field {
      display: inline-block;
      width: 50px;
      height: 50px;
    }
  `]
})
export class BoardComponent implements OnInit {

  board: Board;

  /**
   * Local copy of the board fields
   */
  localFields: Array<Array<Field>>;

  constructor() {
    this.board = new Board(5, 5);
    this.localFields = [[]];
    for (let i = 0; i < this.board.sizeY; i++) {
      this.localFields[i] = [];
      for (let j = 0; j < this.board.sizeX; j++) {
        this.localFields[i][j] = Field.Empty;
      }
    }
  }

  ngOnInit(): void {
  }

  fieldClickListened(stuff: FieldClickEvent): void {
    this.board.set(stuff.X, stuff.Y, Field.Cross);
    this.localFields[stuff.Y][stuff.X] = Field.Cross;
  }

}
