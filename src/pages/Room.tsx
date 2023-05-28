import React, {useState, useEffect} from 'react'

import BoardComponent from "components/game/BoardComponent"
import LostFigures from "components/game/LostFigures"
import Timer from "components/game/Timer"
import SlideOutPane from "components/base/SlideOutPane"
import Button from "components/base/Button"

// import { FortIcon } from '@mui/icons-material'
import FortIcon from '@mui/icons-material/Fort'
import WavingHandIcon from '@mui/icons-material/WavingHand'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled'

import {Board} from "models/game/Board"

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
    const [figuresPaneModal, setFiguresPaneModal] = useState(false)

    const handleFiguresPaneToggle = (value: boolean) => {
        setFiguresPaneModal(value)
    }

    // Spells pane
    const [spellsPaneModal, setSpellsPaneModal] = useState(false)

    const handleSpellsPaneToggle = (value: boolean) => {
        setSpellsPaneModal(value)
    }

    return (
        <div className="room position-relative d-flex flex-column align-center justify-center full-width full-height px-sm-4">
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
            <SlideOutPane active={spellsPaneModal} orientation="right" toggle={handleSpellsPaneToggle}>
                <p>Spells pane</p>
            </SlideOutPane>
            <div className="room__content d-flex flex-column">
                <div className="d-flex justify-space-between full-width">
                    <Button size="large" onClick={() => handleFiguresPaneToggle(!figuresPaneModal)}>
                        <FortIcon />
                    </Button>
                    <Button size="large" onClick={onStartClick}>
                        <PlayCircleFilledIcon />
                    </Button>
                    <Button size="large" onClick={() => handleSpellsPaneToggle(!spellsPaneModal)}>
                        <WavingHandIcon />
                    </Button>
                </div>
                <Timer player={board.blackPlayer} />
                <BoardComponent board={board} />
                <Timer player={board.whitePlayer} />
            </div>
        </div>
    )
}

export default Room