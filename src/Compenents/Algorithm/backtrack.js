import { delay, disableAllButtons, sleep } from "../Utils/utils";

let columnFilled = [];
let leftDiagonal = [];
let rightDiagonal = [];

async function tryToPlaceQueen(grid, currentQueen, numberOfQueens) {
  // Rather than our cells being [y][x], all of our cells here are in one flat array, so Row 1, Col 1 is at 0,
  // Row 1 Col 2 is at 1 and Row 2 Col 1 is going to be at 4 if the grid size is 4 and 8 if the grid size if 8.

  // Since we need to place one on each row, and the number of queens is always going to be the width of the grid we can
  // find out the first cell of the row we want to place it on by saying "currentQueen * numberOfQueens".
  const firstCell = currentQueen * numberOfQueens;

  if (currentQueen === numberOfQueens) {
    return true;
  }

  for (let cell = firstCell; cell < firstCell + numberOfQueens; cell++) {
    const column = cell - firstCell;
    const color = grid[cell].style.background;

    // If there's either a queen in this column or either of the diagonals we can't place a queen here. Paint it red for
    // a short amount and move on
    if (
      columnFilled[column] !== false ||
      leftDiagonal[currentQueen - column + numberOfQueens - 1] !== false ||
      rightDiagonal[column + currentQueen] !== false
    ) {
      await sleep(delay);
      grid[cell].style.background = "red";
      await sleep(delay);
      grid[cell].style.background = color;
      continue;
    }

    // We can place a queen down, so let's mark this column, the left and right diagonal as occupied
    rightDiagonal[column + currentQueen] = true;
    leftDiagonal[currentQueen - column + numberOfQueens - 1] = true;
    columnFilled[column] = true;

    grid[cell].style.background = "green";
    grid[cell].innerHTML = "&#9813;";
    await sleep(delay);
    grid[cell].style.background = color;

    // Let's try placing a queen on the next row down. If we're able to do that, return true because it means that this
    // queen's placement is also valid
    if (await tryToPlaceQueen(grid, currentQueen + 1, numberOfQueens)) {
      return true;
    }

    // If the above was false, it means that we couldn't place a queen here after all because one of the rows lower down
    // wouldn't be valid. This is what the "backtrack" is in this algorithm, we know that at least one of the rows below
    // us can't be placed, so we just give up on trying any combinations that involve the queen being in this cell.

    await sleep(delay);
    grid[cell].style.background = "red";
    await sleep(delay);
    grid[cell].innerHTML = "";
    grid[cell].style.background = color;

    // We have to remove the queen, which means marking the column, left diagonal and right diagonal as occupied
    rightDiagonal[column + currentQueen] = false;
    leftDiagonal[currentQueen - column + numberOfQueens - 1] = false;
    columnFilled[column] = false;
  }

  // If we had a valid placement, we would have hit `return true` up above and already exited out of the loop. Since
  // we're here, it means that there's no valid placement of Queens for this row. By returning false, the recursive call
  // above us will remove their own queen and try the next cell.
  return false;
}

export async function backtrack() {
  disableAllButtons(true);
  document
    .querySelectorAll(".element-block")
    .forEach((element) => (element.innerHTML = ""));

  document.getElementById("nqueen").className = "btndisabled";
  const grid = document.querySelectorAll(".element-block");
  const gridSize = grid.length;
  const numberOfQueens = Math.sqrt(gridSize);
  columnFilled = [];
  leftDiagonal = [];
  rightDiagonal = [];

  for (let i = 0; i < numberOfQueens; i++) {
    columnFilled.push(false);
  }

  for (let i = 0; i < 2 * numberOfQueens - 1; i++) {
    leftDiagonal.push(false);
    rightDiagonal.push(false);
  }
  await tryToPlaceQueen(grid, 0, numberOfQueens);

  document.getElementById("nqueen").className = "btn";
  disableAllButtons(false);
}
