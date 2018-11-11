'use strict';
const Cell = require('./Cell');

class Grid {
  constructor(w, h) {
    this.w = w;
    this.h = h;
    this.cells = [];
    this.neighbours = [
      [-1, -1], [-1, 0], [-1, +1],
      [ 0, -1],          [ 0, +1],
      [+1, -1], [+1, 0], [+1, +1]
    ];
  }

  init(liveCells) {
    for (let i = 0; i < this.h; i++) {
      let row = [];
      for (let j = 0; j < this.w; j++) {
        let isLive = false;
        liveCells.forEach(elem => {
          if (elem.x === j && elem.y === i) {
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
        if (cell.isLive !== cell.nextLive) {
          gen = true;
        }
      });
    });
    return !(live && gen);
  }

  checkLiveCell(x, y) {
    console.log('checking cell ', x, y);
    
    let cell = this.getCell(x, y);
    return cell.isLive ? 1 : 0;
  }

  calcNextGen() {
    let cellNum = 0;
    this.cells.forEach(row => {
      row.forEach(cell => {
        let liveCells = 0;
        let x = cell.x;
        let y = cell.y; 

        this.neighbours.forEach(n => {
          liveCells += this.checkLiveCell(x + n[1], y + n[0]);
        });

        if ((cell.isLive && (liveCells === 2 || liveCells === 3)) || (!cell.isLive && liveCells === 3)) {
          cell.nextLive = true;
          cellNum++;
        } else {
          cell.nextLive = false;
        }
      });
    });
    return cellNum;
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