'use strict';
const Cell = require('./Cell');

class Game {
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
    this.gen = 0;
    this.isGameOver = false;
    this.avg = 0;
    this.liveCellsByTurn = [];

  }

  init(liveCells) {
    for (let i = 0; i < this.h; i++) {
      for (let j = 0; j < this.w; j++) {
        let isLive = false;
        liveCells.forEach(elem => {
          if (elem.x === j && elem.y === i) {
            isLive = true;
            this.cellNum++;
          }
        });
        this.cells.push(new Cell(j, i, isLive));
      }
    }
    this.avg = this.cellNum;
    this.liveCellsByTurn.push(this.avg);
  }

  getCell(x, y) {
    return this.cells[x + (this.w * y)];
  }

  checkLiveCell(coordX, coordY) {
    let x = coordX < 0 ? this.w - 1 : coordX >= this.w ? 0 : coordX;
    let y = coordY < 0 ? this.h - 1 : coordY >= this.h ? 0 : coordY;

    let cell = this.getCell(x, y);
    return cell.isLive ? 1 : 0;
  }

  calcNextGen() {
    this.cellNum = 0;
    this.gen++;
    this.cells.forEach(cell => {
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

      if (cell.nextLive) {
        this.cellNum++;
      }

      if (cell.isLive && !cell.nextLive) {
        cell.isDying = true;
      } else {
        cell.isDying = false;
      }
    });
    this.liveCellsByTurn.push(this.cellNum);
  }

  update() {
    let gen, live = false;
    this.cells.forEach(cell => {
      if (cell.isLive !== cell.nextLive) {
        gen = true;
      }
      if (cell.nextLive) {
        live = true;
      }
      cell.isLive = cell.nextLive;
    });
    this.isGameOver = !(live && gen);
    this.avg = this.liveCellsByTurn.reduce((prev, curr) => prev + curr) / this.liveCellsByTurn.length;
  }
}

module.exports = Game;