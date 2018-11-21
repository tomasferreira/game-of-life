'use strict';
const chalk = require('chalk');
const clear = require('clear');
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

    this.liveCell = chalk.bgGreen('  ');
    this.deadCell = chalk.bgBlack('  ');
    this.dyingCell = chalk.bgBlue('  ');
  }

  printGrid() {
    print(this.horPad);

    for (let i = 0; i < this.h; i++) {
      let line = '';
      for (let j = 0; j < this.w; j++) {
        let cell = this.grid.getCell(j, i);
        if (cell.isLive) {
          line += this.liveCell;
        } else if (cell.isDying) {
          line += this.dyingCell;
        } else {
          line += this.deadCell;
        }
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

  printGenNum(num) {
    print(chalk.red.bold('Current generation: ', num));
  }

  printAvg(avg) {
    print(chalk.red.bold('Current Average: ', avg));
  }

  print(str) {
    print(str);
  }

  clear() {
    clear();
  }

  printEnd(genNum, avg){
    print(chalk.green.bold('Game ended after ', genNum - 1, 'gens, with avg ', avg));
  }

  printStart(size, numLiveCells) {
    print(chalk.blue.bold('Starting the game of life with ', size, ' cells and ', numLiveCells, ' live cells'));
  }

  printStatus(cellNum, genNum, avg) {
    print(chalk.blue.bgYellow.bold('Game of Life'));
    this.printCellNum(cellNum);
    this.printGenNum(genNum);
    this.printAvg(avg);
  }

  printStatusInLine(cellNum, genNum, avg) {
    print(chalk.red.bold('Gen: ', genNum, ' || Cells: ', cellNum, ' || Avg: ', avg));
  }

  printGameOver(genNum) {
    print(chalk.blue.bgYellow.bold('Game of Life ended after ', genNum, ' generations.'));
  }
}

module.exports = Printer;