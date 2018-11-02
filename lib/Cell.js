'use strict';

class Cell{
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.isLive = false;
    if(x === 2 && y === 1) this.isLive = true;
  }
}

module.exports = Cell;