'use strict';
const Cell = require('./lib/Cell');

class Grid{
  constructor(w, h) {
    this.w = w;
    this.h = h;
    this.cells = [];
  }
}

module.exports = Grid;