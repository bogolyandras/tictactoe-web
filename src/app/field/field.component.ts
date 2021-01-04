import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Field, FieldMeta} from '../../logic/field';


@Component({
  selector: 'app-field',
  template: `
    <span (click)="processFieldClick()" [classList]=ClassNames>
      {{TransposedValue}}
    </span>
  `,
  styles: [`
    span {
      display: block;
      overflow: auto;
      cursor: pointer;
    }
    .relatedToWinningCross {
      background-color: yellow;
    }
    .recentlyChecked {
      background-color: red;
    }
  `]
})
export class FieldComponent implements OnInit, OnChanges {

  @Input() State: Field = Field.Empty;
  @Input() Meta: FieldMeta = new FieldMeta();

  @Input() X = -1;
  @Input() Y = -1;

  @Output() fieldClicked = new EventEmitter<FieldClickEvent>();

  TransposedValue = 'E';
  ClassNames = new Array<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  processFieldClick(): void {
    this.fieldClicked.emit(new FieldClickEvent(this.X, this.Y));
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (propName === 'State') {
        switch (this.State) {
          case Field.Empty:
            this.TransposedValue = 'E';
            break;
          case Field.Naught:
            this.TransposedValue = 'O';
            break;
          case Field.Cross:
            this.TransposedValue = 'X';
            break;
          default:
            throw new Error('Something bad has happened. Field type is: \'' + this.State + '\'');
        }
      } else if (propName === 'Meta') {
        if (this.Meta.recentlyChecked) {
          this.ClassNames.push('recentlyChecked');
          console.log('yeaahhh');
        } else {
          this.ClassNames.forEach( (item, index) => {
            if (item === 'recentlyChecked') { this.ClassNames.splice(index, 1); }
          });
        }

        if (this.Meta.relatedToWinningCross) {
          this.ClassNames.push('relatedToWinningCross');
        } else {
          this.ClassNames.forEach( (item, index) => {
            if (item === 'relatedToWinningCross') { this.ClassNames.splice(index, 1); }
          });
        }

      }
    }
  }

}

export class FieldClickEvent {

  readonly X: number;
  readonly Y: number;

  constructor(X: number, Y: number) {
    this.X = X;
    this.Y = Y;
  }

  public toString(): string {
    return 'Field click event for position x=' + this.X + ', y=' + this.Y;
  }

}
