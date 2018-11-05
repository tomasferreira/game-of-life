'use strict';
const chalk = require('chalk');
const print = console.log;

class Printer {
  constructor(grid) {
    this.grid = grid;
    this.w = grid.w;
    this.h = grid.h;
    this.horPad = '';
    for (let i = 0; i < this.w + 2; i++) {
      this.horPad += '  ';
    }
    this.horPad = chalk.bgWhite(this.horPad);
    this.vertPad = chalk.bgWhite('  ');
  }

  printGrid() {
    let liveCell = chalk.bgGreen('  ');
    let deadCell = chalk.bgBlue('  ');

    print(this.horPad);

    for (let i = 0; i < this.h; i++) {
      let line = '';
      for (let j = 0; j < this.w; j++) {
        line += this.grid.getCell(j, i).isLive ? liveCell : deadCell;
      }
      print(this.vertPad + line + this.vertPad);
    }

    print(this.horPad);
  }

  printCell(cell) {
    print(chalk.red(JSON.stringify(cell)));
  }

  printCoords(x, y) {
    print(chalk.red(JSON.stringify(this.grid.getCell(x, y))));
  }

  printCellNum(num) {
    print(chalk.red.bold('Living cells: ', num));
  }

  printGenNum(num){
    print(chalk.red.bold('Current generation: ', num));
  }
}

module.exports = Printer;