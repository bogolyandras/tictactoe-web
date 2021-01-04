import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div [style.height]="menuHeight + 'px'">{{title}}</div>
    <app-board [width]="widthOfBoard" [height]="heightOfBoard"></app-board>
  `,
})
export class AppComponent implements OnInit {

  title = 'tictactoe';

  widthOfBoard = 1200;
  heightOfBoard = 800;

  menuHeight = 30;

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: UIEvent): void {
    this.adjustWindowSize();
  }

  ngOnInit(): void {
    this.adjustWindowSize();
  }

  private adjustWindowSize(): void {
    this.widthOfBoard = window.innerWidth;
    this.heightOfBoard = window.innerHeight  - this.menuHeight;
  }

}
