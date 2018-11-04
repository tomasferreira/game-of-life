'use strict';

class Cell{
  constructor(x, y, state) {
    this.x = x;
    this.y = y;
    this.isLive = state;
    this.nextLive = false;
  }
}

module.exports = Cell;