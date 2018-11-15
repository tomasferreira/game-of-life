'use strict';
const Cell = require('./Cell');

class Board {
  constructor(w, h) {
    this.w = w;
    this.h = h;
    this.cells = [];
    this.neighbourhood = [
      [-1, -1], [-1, 0], [-1, +1],
      [0, -1], [0, +1],
      [+1, -1], [+1, 0], [+1, +1]
    ];
    this.cellNum = 0;
  }

  init(liveCells) {
    for (let i = 0; i < this.h; i++) {
      let row = [];
      for (let j = 0; j < this.w; j++) {
        let isLive = false;
        liveCells.forEach(elem => {
          if (elem.x === j && elem.y === i) {
            isLive = true;
            this.cellNum++;
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

  checkLiveCell(coordX, coordY) {
    let x = coordX < 0 ? this.w - 1 : coordX >= this.w ? 0 : coordX;
    let y = coordY < 0 ? this.h - 1 : coordY >= this.h ? 0 : coordY;

    let cell = this.getCell(x, y);
    return cell.isLive ? 1 : 0;
  }

  calcNextGen() {
    this.cellNum = 0;
    this.cells.forEach(row => {
      row.forEach(cell => {
        let liveCells = 0;
        let x = cell.x;
        let y = cell.y;

        this.neighbourhood.forEach(n => {
          liveCells += this.checkLiveCell(x + n[1], y + n[0]);
        });

        if (liveCells === 3) {
          cell.nextLive = true;
        } else if (liveCells !== 2) {
          cell.nextLive = false;
        }

        if(cell.nextLive){
          this.cellNum++;
        }
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

module.exports = Board;