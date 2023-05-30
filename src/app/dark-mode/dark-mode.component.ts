import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

const RADIUS = 50;
const ADD = 10;

@Component({
  selector: 'app-dark-mode',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dark-mode.component.html',
  styleUrls: ['./dark-mode.component.scss'],
})
export class DarkModeComponent {
  radius = RADIUS;
  pointerX = -9999;
  pointerY = -9999;
  isDoubleClick: boolean = false;
  timeout: any;
  timeInterval: any;

  @HostListener('document:mousemove', ['$event'])
  onMousemove(event: MouseEvent) {
    this.pointerX = event.clientX;
    this.pointerY = event.clientY;
  }

  @HostListener('document:mouseleave')
  onLeaveWindow(event: MouseEvent) {
    this.pointerX = -9999;
    this.pointerY = -9999;
  }

  @HostListener('document:mousedown')
  onMouseDown(event: MouseEvent) {
    this.timeout = setTimeout(() => {
      this.timeInterval = setInterval(() => {
        this.radius = this.radius + 1;
      },10);
    }, 1000);
  }

  @HostListener('document:mouseup')
  onMouseUp(event: MouseEvent) {
    clearTimeout(this.timeout);
    clearInterval(this.timeInterval);
  }
}
