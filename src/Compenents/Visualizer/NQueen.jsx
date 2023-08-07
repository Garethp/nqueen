import { useEffect, useState } from "react";
import { backtrack } from "../Algorithm/backtrack";
import { changeDelay } from "../Utils/utils";
import "./NQueen.css";

export default () => {
  const [gridSize, setGridSize] = useState(4);

  let [grid, setGrid] = useState([]);

  function renderGrid(val) {
    let gridArray = [];
    for (let y = 0; y < val; y++) {
      let row = [];
      for (let x = 0; x < val; x++) {
        if (y % 2 === x % 2) {
          row.push("white element-block");
        } else {
          row.push("black element-block");
        }
      }

      gridArray.push(row);
    }
    setGrid(gridArray);

    document
      .querySelectorAll(".element-block")
      .forEach((element) => (element.innerHTML = ""));
  }

  useEffect(() => {
    renderGrid(gridSize);
  }, [gridSize]);

  return (
    <div>
      <div className="navbar">
        <ul>
          <li>
            <a className="heading" href="#home">
              N-Queens Visualiser
            </a>
          </li>
          <li style={{ float: "right" }}>
            <a
              style={{ padding: "5px" }}
              href="https://github.com/jindal2209/nqueen"
              target="_blank"
              rel="noreferrer"
            >
              <img
                style={{ width: "70px" }}
                src={process.env.PUBLIC_URL + "/iff.png"}
                alt="myGithub"
              />
            </a>
          </li>
        </ul>
      </div>
      <div style={{ marginTop: "30px" }}>
        <div>
          <label>
            Grid Size: {gridSize} X {gridSize}
            <input
              id="rangeSlider"
              type="range"
              min="4"
              max="8"
              value={gridSize}
              onChange={(e) => setGridSize(parseInt(e.target.value))}
            />
          </label>
          <br />
          <label>
            Delay:
            <input
              type="range"
              min="0"
              max="1000"
              onChange={(e) => {
                changeDelay(e.target.value);
              }}
            />
          </label>
          <div>
            <button className="btn" id="nqueen" onClick={backtrack}>
              N-QUEEN
            </button>
          </div>
        </div>
        <br />
        <div className="box">
          <table className="board">
            <tbody>
              {grid === null
                ? null
                : grid.map((row, rowId) => (
                    <tr key={rowId}>
                      {row.map((cellClassName, cellId) => (
                        <td
                          key={cellId}
                          style={{
                            width: 400 / gridSize,
                            height: 400 / gridSize,
                            fontSize: 200 / gridSize,
                          }}
                          className={cellClassName}
                        ></td>
                      ))}
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
