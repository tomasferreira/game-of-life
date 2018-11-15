'use strict';
const Printer = require('./lib/Printer');
const Board = require('./lib/Board');
const size = process.argv[2] ? parseInt(process.argv[2]) : 30;
const numLiveCells = process.argv[3] ? parseInt(process.argv[3]) : 300;
const interval = 0.6 * 1000;

var liveCells = [];

for (let i = 0; i < numLiveCells; i++) {
  liveCells.push({
    x: Math.floor(Math.random() * size),
    y: Math.floor(Math.random() * size)
  });
}

let board = new Board(size, size);
var printer = new Printer(board);
printer.printStart(size, numLiveCells);
board.init(liveCells);

let cellNum = numLiveCells;
printer.printCellNum(cellNum);
printer.printGenNum(0);
printer.printGrid();

var genNum = 0;
let gameOver = false;

function gameLoop() {
  printer.clear();
  board.calcNextGen();
  gameOver = board.isGameOver();
  board.update();
  printer.printStatus(board.cellNum, ++genNum);
  printer.printGrid();

  if (gameOver) {
    clearInterval(int);
  }
}

var int = setInterval(gameLoop, interval);
