import React, {useState, useEffect} from 'react';
import BoardComponent from "components/game/BoardComponent";
import {Board} from "models/Board";
import LostFigures from "components/game/LostFigures";
import Timer from "components/game/Timer";

function Game() {
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
        <div className="game d-flex justify-center align-center full-width full-height">
            <Timer player={board.blackPlayer} />
            <BoardComponent board={board} />
            <Timer player={board.whitePlayer} />
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

export default Game;