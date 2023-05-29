import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';

const DURATION_TIME_CHECK_MOVES = 3000;
const CHECK_SPEED_LAST_MOVES_NUMBERS = 15;
const MAX_TIME_MOVES = 130;
const MAX_MOUSE_SPEED = 2500;
const RESET_TIME = 200;

/**
 * This app will check if you move too fast:
 * 1. you mouse more than MAX_TIME_MOVES in last DURATION_TIME_CHECK_MOVES ms
 * 2. Your last speed in last CHECK_SPEED_LAST_MOVES_NUMBERS moves is faster than MAX_MOUSE_SPEED
 */

@Component({
  selector: 'app-face',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './face.component.html',
  styleUrls: ['./face.component.scss'],
})
export class FaceComponent {
  @ViewChildren('eye') eyeChildren: QueryList<ElementRef>;

  mouseMovements: any[] = [];

  timestamp = 0;
  mY: number = 0;
  mouseSpeed = 0;

  checkMouseMovementsTimeout: any;
  checkMouseSpeedTimeout: any;

  onMousemove(event) {
    this.setEyeFollow(event);

    clearTimeout(this.checkMouseSpeedTimeout);
    clearTimeout(this.checkMouseMovementsTimeout);
    this.checkMouseMovementsTimeout = setTimeout(() => {
      this.mouseMovements = [];
    }, RESET_TIME);

    this.checkMouseSpeedTimeout = setTimeout(() => {
      this.mouseSpeed = 0;
    }, 50);

    this.countMouseMovementsInLastDuration(event);
  }

  get isTooFast() {
    return (
      this.mouseMovements.length > MAX_TIME_MOVES &&
      this.mouseSpeed > MAX_MOUSE_SPEED
    );
  }

  countMouseSpeed(event) {
    const now = Date.now();
    const currentmY = event.screenY;
    const time = now - this.timestamp;
    const distance = Math.abs(currentmY - this.mY);
    const currentSpeed = Math.round((distance / time) * 1000);
    this.mY = currentmY;
    this.timestamp = now;
    return currentSpeed;
  }

  countMouseMovementsInLastDuration(event) {
    this.mouseMovements.push([Date.now(), this.countMouseSpeed(event)]);

    this.mouseMovements = this.mouseMovements.filter(([time, speed]) => {
      return Date.now() - time < DURATION_TIME_CHECK_MOVES;
    });

    const listSpeed = this.mouseMovements
      .slice(-CHECK_SPEED_LAST_MOVES_NUMBERS)
      .map(([time, speed]) => speed);
    const mouseSpeed = Math.max(...(listSpeed as number[]));
    if (mouseSpeed < MAX_MOUSE_SPEED) {
      this.mouseMovements = this.mouseMovements.slice(-60)
    }
    this.mouseSpeed = mouseSpeed
  }

  setEyeFollow(event) {
    this.eyeChildren.forEach(({ nativeElement }, i) => {
      const eye = nativeElement;
      const eyeX = eye.getBoundingClientRect().left + eye.clientWidth / 2;
      const eyeY = eye.getBoundingClientRect().top + eye.clientWidth / 2;
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      const radian = Math.atan2(eyeX - mouseX, eyeY - mouseY);
      const deg = -(radian / Math.PI) * 180 + 90;
      eye.style.transform = `rotate(${deg}deg)`;
    });
  }
}
