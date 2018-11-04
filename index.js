'use strict';
const chalk = require('chalk');
const print = console.log;
const Printer = require('./lib/Printer');
const clear = require('clear');
const size = process.argv[2] ? parseInt(process.argv[2]) : 20;
const numLiveCells = process.argv[3] ? parseInt(process.argv[3]) : 100;
const interval = 0.3 * 1000;

var liveCells = [];

for (let i = 0; i < numLiveCells; i++) {
  liveCells.push({
    x: Math.floor(Math.random() * size),
    y: Math.floor(Math.random() * size)
  });
}

const Grid = require('./lib/Grid');
print(chalk.blue.bgYellow.bold('starting the game of life with ', size*size, ' cells and ', numLiveCells, ' live cells...'));
let grid = new Grid(size, size);
grid.init(liveCells);

var printer = new Printer(grid);
printer.printGrid();

function gameLoop() {
  clear();
  grid.calcNextGen();
  let gameOver = grid.isGameOver();
  grid.update();
  printer.printGrid();
  if(gameOver){
    clearInterval(int);
  }
}

var int = setInterval(gameLoop, interval);
