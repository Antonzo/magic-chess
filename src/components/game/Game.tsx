import React, {useState, useEffect} from 'react'

import BoardComponent from "components/game/BoardComponent"
import LostFigures from "components/game/LostFigures"
import Timer from "components/game/Timer"
import SlideOutPane from "components/base/SlideOutPane"
import Button from "components/base/Button"

import {Board} from "models/Board"

import "components/game/Game.scss"

function Game() {
    // Board main
    const [board, setBoard] = useState(new Board())

    useEffect(() => {
        initGame()
    }, [])


    function initGame() {
        const newBoard = new Board()
        setBoard(newBoard)
    }

    // TODO: create proper start game logic
    function onStartClick() {
        board.start()
    }

    // Lost figures pane
    const [figuresPaneModal, setFiguresPaneModal] = useState(false);

    const handleFiguresPaneToggle = (value: boolean) => {
        setFiguresPaneModal(value)
    }

    return (
        <div className="game d-flex flex-column align-center justify-center full-width full-height">
            <div className="game__board-wrapper d-flex flex-column justify-center align-center full-width">
                <SlideOutPane active={figuresPaneModal} toggle={handleFiguresPaneToggle}>
                    <p>aa</p>
                </SlideOutPane>
                <Button size="large">
                    start
                </Button>
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