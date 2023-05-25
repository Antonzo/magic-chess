import React, {useState, useEffect} from 'react'

import BoardComponent from "components/game/BoardComponent"
import LostFigures from "components/game/LostFigures"
import Timer from "components/game/Timer"
import SlideOutPane from "components/base/SlideOutPane"
import Button from "components/base/Button"

import {Board} from "models/Board"

import "pages/Room.scss"

function Room() {
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
    const [figuresPaneModal, setFiguresPaneModal] = useState(true);

    const handleFiguresPaneToggle = (value: boolean) => {
        setFiguresPaneModal(value)
    }

    return (
        <div className="room d-flex flex-column align-center justify-center full-width full-height">
            <SlideOutPane active={figuresPaneModal} toggle={handleFiguresPaneToggle}>
                <LostFigures
                    title="Black figures"
                    figures={board.lostBlackFigures}
                />
                <LostFigures
                    title="White figures"
                    figures={board.lostWhiteFigures}
                />
            </SlideOutPane>
            <Button size="large" onClick={onStartClick}>
                start
            </Button>
            <Timer player={board.blackPlayer} />
            <BoardComponent board={board} />
            <Timer player={board.whitePlayer} />
        </div>
    );
}

export default Room;