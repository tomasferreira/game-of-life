class DataSet {
  constructor(size) {
    var DataSet = [];
    var maxNumberLiveCells = size;

    for(let i = 0; i <= maxNumberLiveCells; i++) {
      let numCells = i;
      let startPos = 0;

      let data = new Array(size);


      // block all except i
      // move i across the list
      // when i reaches end, unblock i-1, move one in the list
      // restart with i next to i-1
    }
    
    return DataSet;
  }
}

module.exports = DataSet;