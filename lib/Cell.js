'use strict';

class Cell{
  constructor(x, y, isLive) {
    this.x = x;
    this.y = y;
    this.isLive = isLive;
    this.nextLive = false;
    this.isDying = false;
  }
}

module.exports = Cell;