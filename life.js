const fs = require('fs');

const present = [];
/*
[
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 0, 0, 0]
];
*/

const next = [];
/*
[
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];
*/

let swap = false;

/**
 * Create an empty game surface area of a specified size.
 * @param {Number} rows number of rows
 * @param {Number} cols number of columns
 */
function init(rows, cols) {
  initArr(present, rows, cols);
  initArr(next, rows, cols);
}

/**
 * Initialize an array to be 2D and full of 0s.
 * @param {*} arr 2D array to initialize
 * @param {*} rows number of rows
 * @param {*} cols number of columns
 */
function initArr(arr, rows, cols) {
  for (let i = 0; i < rows; i++) {
    arr.push([]);
    for (let j = 0; j < cols; j++) {
      arr[i].push(0);
    }
  }
}

/**
 * Load a .cells file
 * @param {String} filepath the path to the .cells file
 * @return {Array} 2D array of the pattern
 */
function load(filepath) {
  const contents = fs.readFileSync(filepath, 'utf8');
  const lines = contents.split(/\r?\n/);
  const pattern = [];
  for (const line of lines) {
    if (!line.length || line[0] === '!') {
      continue;
    }
    pattern.push([]);
    for (const char of line) {
      pattern[pattern.length - 1].push(char === 'O' ? 1 : 0);
    }
  }
  return pattern;
}

/**
 * Stamp a pattern onto an array.
 * @param {Array} pattern 2D array of pattern
 * @param {Array} destArr 2D array to have pattern stamped on
 *                        (must be at least as large as the pattern)
 * @param {*} x x location in destArr to place top left corner of pattern
 * @param {*} y y location in destArr to place top left corner of pattern
 */
function stamp(pattern, destArr, x, y) {
  for (let i = 0; i < pattern.length; i++) {
    for (let j = 0; j < pattern[i].length; j++) {
      destArr[y+i][x+j] = pattern[i][j];
    }
  }
}

/**
 * Execute one tick of Conway's Game of Life.
 * @param {Array} present present state array
 * @param {Array} next next state array
 */
function tick(present, next) {
  for (let i = 0; i < present.length; i++) {
    for (let j = 0; j < present[i].length; j++) {
      const iUpIndex = i - 1 < 0 ? present.length - 1 : i - 1;
      const iDownIndex = i + 1 >= present.length ? 0 : i + 1;
      const jLeftIndex = j - 1 < 0 ? present[i].length - 1 : j - 1;
      const jRightIndex = j + 1 >= present[i].length ? 0 : j + 1;

      let sum = 0;
      sum += present[iUpIndex][jLeftIndex];
      sum += present[iUpIndex][j];
      sum += present[iUpIndex][jRightIndex];
      sum += present[i][jLeftIndex];
      sum += present[i][jRightIndex];
      sum += present[iDownIndex][jLeftIndex];
      sum += present[iDownIndex][j];
      sum += present[iDownIndex][jRightIndex];

      if (present[i][j] === 0 && sum === 3) {
        next[i][j] = 1;
      } else if (present[i][j] === 1 && (sum === 2 || sum === 3)) {
        next[i][j] = 1;
      } else {
        next[i][j] = 0;
      }
    }
  }
}

/**
 * Calls tick and returns the new state.
 * @return {Array} new state of the game
 */
function step() {
  swap = !swap;
  if (swap) {
    tick(present, next);
    return next;
  } else {
    tick(next, present);
    return present;
  }
}

/**
 * Display a 2D array.
 * @param {Array} arr
 */
function display(arr) {
  for (const row of arr) {
    console.log(row);
  }
  console.log();
}

module.exports = {
  init,
  load,
  stamp,
  tick,
  step,
  display,
  present,
  next,
  swap,
};
