'use strict';

class Cell{
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.live = false;
  }
  set live(isLive) {
    this.live = isLive;
  }
  get live() {
    return this.live;
  }
  get x() {
    return this.x;
  }
  get y() {
    return this.y;
  }
}

module.exports = Cell;