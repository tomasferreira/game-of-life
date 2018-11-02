'use strict';
const Cell = require('./Cell');

class Grid {
  constructor(w, h) {
    this.w = w;
    this.h = h;
    this.cells = [];
  }

  init() {
    for(let i = 0; i < this.h; i++){
      let row = [];
      for(let j = 0; j < this.w; j++){
        row.push(new Cell(j, i));
      }
      this.cells.push(row);
    }
  }

  getCell(x, y){
    return this.cells[y][x];
  }
}

module.exports = Grid;