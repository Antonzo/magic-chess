import React, {useState, useEffect} from 'react'
import BoardComponent from "components/game/BoardComponent"
import {Board} from "models/Board"
import LostFigures from "components/game/LostFigures"
import Timer from "components/game/Timer"
import "components/game/Game.scss"

function Game() {
    const [board, setBoard] = useState(new Board())

    useEffect(() => {
        initGame()
    }, [])


    function initGame() {
        const newBoard = new Board()
        // newBoard.start()
        setBoard(newBoard)
    }

    return (
        <div className="d-flex flex-column align-center justify-center full-width full-height">
            <div className="board-wrapper d-flex flex-column justify-center align-flex-end">
                <LostFigures
                    title="Black figures"
                    figures={board.lostBlackFigures}
                />
                <Timer player={board.blackPlayer} />
                <BoardComponent board={board} />
                <Timer player={board.whitePlayer} />
                <LostFigures
                    title="White figures"
                    figures={board.lostWhiteFigures}
                />
            </div>
        </div>
    );
}

export default Game;