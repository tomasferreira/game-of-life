'use strict';
const chalk = require('chalk');
const print = console.log;
const Printer = require('./lib/Printer');
const clear = require('clear');
const size = process.argv[2] ? parseInt(process.argv[2]) : 10;
const numLiveCells = process.argv[3] ? parseInt(process.argv[3]) : 50;
const interval = 0.2 * 1000;

var liveCells = [];

for (let i = 0; i < numLiveCells; i++) {
  liveCells.push({
    x: Math.floor(Math.random() * size),
    y: Math.floor(Math.random() * size)
  });
}

const Grid = require('./lib/Grid');
print(chalk.blue.bgYellow.bold('starting the game of life with ', size * size, ' cells and ', numLiveCells, ' live cells...'));
let grid = new Grid(size, size);
grid.init(liveCells);

var printer = new Printer(grid);
let cellNum = numLiveCells;
printer.printCellNum(cellNum);
printer.printGenNum(0);
printer.printGrid();

var genNum = 0;
let gameOver = false;
function gameLoop() {
  // clear();
  cellNum = grid.calcNextGen();
  gameOver = grid.isGameOver();
  grid.update();
  print(chalk.blue.bgYellow.bold('Game of Life'));
  printer.printCellNum(cellNum);
  printer.printGenNum(genNum);
  printer.printGrid();
  genNum++;
  // if (gameOver) {
  //   clearInterval(int);
  // }
}

// var int = setInterval(gameLoop, interval);
gameLoop();
