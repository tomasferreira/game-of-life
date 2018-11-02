'use strict';
const chalk = require('chalk');
const print = console.log;
const Printer = require('./lib/Printer');

const Grid = require('./lib/Grid');
print(chalk.blue.bgYellow.bold('starting the game of life...'));

let grid = new Grid(10, 10);
grid.init();

var printer = new Printer(grid);

printer.printCoords(2,1);


printer.printCell(grid.getCell(2,1));
printer.printGrid();