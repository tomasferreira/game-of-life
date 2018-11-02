'use strict';
const chalk = require('chalk');
const print = console.log;

class Printer {
  constructor(grid) {
    this.grid = grid;
  }

  printGrid() {
    //let cellStr = String.fromCharCode(0x25A2) + String.fromCharCode(0x25A2); 
    let liveCell = chalk.blue.bgBlue('  ');
    let deadCell = chalk.red.bgRed('  ');
    // let horMargin = chalk.red. 
    // console.table(this.grid.cells);
    for (let i = 0; i < this.grid.h; i++) {
      let line = '';
      for (let j = 0; j < this.grid.w; j++) {
        line += this.grid.getCell(j, i).isLive ? liveCell : deadCell;
      }
      print(line);
    }
  }

  printCell(cell) {
    print(chalk.red(JSON.stringify(cell)));
  }

  printCoords(x, y) {
    print(chalk.red(JSON.stringify(this.grid.getCell(x, y))));
  }
}

module.exports = Printer;