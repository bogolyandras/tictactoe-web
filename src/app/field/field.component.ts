import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Field} from '../../logic/field';


@Component({
  selector: 'app-field',
  template: `
    <span (click)="doFieldClicked()">
      {{TransposedValue}}
    </span>
  `,
  styles: [
  ]
})
export class FieldComponent implements OnInit, OnChanges {

  @Input() State: Field = Field.Empty;
  @Input() X = -1;
  @Input() Y = -1;

  @Output() fieldClicked = new EventEmitter<FieldClickEvent>();

  TransposedValue = 'E';

  constructor() {
  }

  ngOnInit(): void {
  }

  doFieldClicked(): void {
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
