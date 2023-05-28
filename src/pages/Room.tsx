import React, {useState, useEffect} from 'react'

import BoardComponent from "components/game/BoardComponent"
import LostFigures from "components/game/LostFigures"
import Timer from "components/game/Timer"
import SlideOutPane from "components/base/SlideOutPane"
import Button from "components/base/Button"
import armageddon from "assets/magic/armageddon-spell.png"
import astralStep from "assets/magic/astral-step-spell.png"
import poison from "assets/magic/poison-effect.png"
import frozenSoul from "assets/magic/frozen-soul-effect.png"
import holyShield from "assets/magic/holy-shield-effect.png"
import chronoStamp from "assets/magic/chrono-stamp-effect.png"
import blessing from "assets/magic/blessing-effect.png"
import torrentialSurge from "assets/magic/torrential-surge-spell.png"
import shadowStep from "assets/magic/shadow-step-effect.png"
import naturalGrowth from "assets/magic/natural-growth-spell.png"
import phoenixBarrier from "assets/magic/phoenix-barrier-effect.png"
import paranormalArea from "assets/magic/paranormal-area-effect.png"

import FortIcon from '@mui/icons-material/Fort'
import WavingHandIcon from '@mui/icons-material/WavingHand'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled'

import {Game} from "models/game/Game"

import "pages/Room.scss"

function Room() {
    // Board main
    const [board, setBoard] = useState(new Game())

    useEffect(() => {
        initGame()
    }, [])


    function initGame() {
        const newBoard = new Game()
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
            <div className="d-flex align-center justify-center">
                <img src={armageddon} alt="armageddon" className="rounded-circle overflow-hidden" width={70} height={70} />
                <img src={astralStep} alt="atral-step" className="rounded-circle overflow-hidden" width={70} height={70} />
                <img src={poison} alt="poison" className="rounded-circle overflow-hidden" width={70} height={70} />
                <img src={frozenSoul} alt="frozen-soul" className="rounded-circle overflow-hidden" width={70} height={70} />
                <img src={holyShield} alt="holy-shield" className="rounded-circle overflow-hidden" width={70} height={70} />
                <img src={chronoStamp} alt="chrono-stamp" className="rounded-circle overflow-hidden" width={70} height={70} />
                <img src={blessing} alt="blessing" className="rounded-circle overflow-hidden" width={70} height={70} />
                <img src={torrentialSurge} alt="torrential-surge" className="rounded-circle overflow-hidden" width={70} height={70} />
                <img src={shadowStep} alt="shadow-step" className="rounded-circle overflow-hidden" width={70} height={70} />
                <img src={naturalGrowth} alt="natural-growth" className="rounded-circle overflow-hidden" width={70} height={70} />
                <img src={phoenixBarrier} alt="phoenix-barrier" className="rounded-circle overflow-hidden" width={70} height={70} />
                <img src={paranormalArea} alt="paranormal-area" className="rounded-circle overflow-hidden" width={70} height={70} />
            </div>
        </div>
    )
}

export default Room