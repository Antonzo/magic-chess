import React, {useState, useEffect} from 'react';
import './App.css'
import BoardComponent from "./components/BoardComponent";
import {Board} from "./models/Board";
import LostFigures from "./components/LostFigures";
import Timer from "./components/Timer";

function App() {
    const [board, setBoard] = useState(new Board())

    useEffect(() => {
        initGame()
    }, [])


    function initGame() {
        const newBoard = new Board()
        newBoard.start()
        setBoard(newBoard)
    }

    return (
      <div className="app">
        <Timer whitePlayer={board.whitePlayer} blackPlayer={board.blackPlayer} />
        <BoardComponent board={board} />
        <div>
          <LostFigures
              title="Black figures"
              figures={board.lostBlackFigures}
          />
            <LostFigures
                title="White figures"
                figures={board.lostWhiteFigures}
            />
        </div>
      </div>
    );
}

export default App;
