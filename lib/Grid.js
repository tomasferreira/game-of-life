'use strict';
const Cell = require('./Cell');

class Grid {
  constructor(w, h) {
    this.w = w;
    this.h = h;
    this.cells = [];
  }

  init(liveCells) {
    for (let i = 0; i < this.h; i++) {
      let row = [];
      for (let j = 0; j < this.w; j++) {
        let isLive = false;
        liveCells.forEach(elem => {
          if(elem.x === j && elem.y === i){
            isLive = true;
          }
        });
        row.push(new Cell(j, i, isLive));
      }
      this.cells.push(row);
    }
  }

  getCell(x, y) {
    return this.cells[y][x];
  }

  isGameOver() {
    let live = false;
    let gen = false;
    this.cells.forEach(row => {
      row.forEach(cell => {
        if (cell.isLive) {
          live = true;
        }
        if(cell.isLive !== cell.nextLive){
          gen = true;
        }
      });
    });
    return !(live && gen);
  }

  calcNextGen() {
    this.cells.forEach(row => {
      row.forEach(cell => {
        let liveCells = 0;
        let x = cell.x;
        let y = cell.y;

        for (let i = y - 1; i <= y + 1; i++) {
          for (let j = x - 1; j <= x + 1; j++) {
            if ((i < 0 || j < 0 || i >= this.h || j >= this.w) || (i === y && j === x)) {
              continue;
            }
            if (this.cells[i][j].isLive) {
              liveCells++;
            }
          }
        }
        // console.log('alive neighbours: ', liveCells);
        if (cell.isLive&& (liveCells === 2 || liveCells === 3)) {
          cell.nextLive = true;
          // console.log('keep alive');
        } else if (cell.isLive) {
          cell.nextLive = false;
          // console.log('kill');
        } else if (!cell.isLive && liveCells === 3) {
          cell.nextLive = true;
          // console.log('reborn');
        } else {
          cell.nextLive = false;
          // console.log('stay dead');
        }
        // console.log('checking cell: ', cell);
      });
    });
  }

  update() {
    this.cells.forEach(row => {
      row.forEach(cell => {
        cell.isLive = cell.nextLive;
      });
    });
  }
}

module.exports = Grid;