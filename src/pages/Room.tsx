import React, {useState, useEffect} from 'react'

import BoardComponent from "components/game/BoardComponent"
import LostFigures from "components/game/LostFigures"
import Timer from "components/game/Timer"
import SlideOutPane from "components/base/SlideOutPane"
import Button from "components/base/Button"
import SpellList from "components/magic/SpellList"

import armageddon from "assets/magic/armageddon.png"
import astralStep from "assets/magic/astral-step.png"
import poison from "assets/magic/poison.png"
import frozenSoul from "assets/magic/frozen-soul.png"
import holyShield from "assets/magic/holy-shield.png"
import chronoStamp from "assets/magic/chrono-stamp.png"
import blessing from "assets/magic/blessing.png"
import torrentialSurge from "assets/magic/torrential-surge.png"
import shadowStep from "assets/magic/shadow-step.png"
import naturalGrowth from "assets/magic/natural-growth.png"
import phoenixBarrier from "assets/magic/phoenix-barrier.png"
import paranormalArea from "assets/magic/paranormal-area.png"
import resurrection from "assets/magic/resurrection.png"

import FortIcon from '@mui/icons-material/Fort'
import WavingHandIcon from '@mui/icons-material/WavingHand'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled'

import {Armageddon} from "models/magic/spells/Armageddon"
import {SpellFactory} from "models/magic/SpellFactory"
import {Game} from "models/game/Game"
import {spellMetaList} from "models/magic/settings/settings1"

import "pages/Room.scss"

function Room() {
    // Game main
    const [game, setGame] = useState(new Game())
    const [spellFactory, setSpellFactory] = useState(new SpellFactory())

    useEffect(() => {
        initGame()
    }, [])


    function initGame() {
        const newGame = new Game()
        spellFactory.load(spellMetaList)
        setGame(newGame)
        setSpellFactory(spellFactory)
    }

    // TODO: create proper start game logic
    function onStartClick() {
        game.start()
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
                    figures={game.lostBlackFigures}
                />
                <LostFigures
                    title="White figures"
                    figures={game.lostWhiteFigures}
                />
            </SlideOutPane>
            <SlideOutPane active={spellsPaneModal} orientation="right" toggle={handleSpellsPaneToggle}>
                <SpellList spellsMeta={spellFactory.spellsMeta} />
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
                <Timer player={game.blackPlayer} />
                <BoardComponent board={game} />
                <Timer player={game.whitePlayer} />
            </div>
            <div className="d-flex align-center justify-center">
                <img
                    src={armageddon}
                    alt="armageddon"
                    className="rounded-circle overflow-hidden"
                    width={70}
                    height={70}
                    onClick={() => spellFactory.create(Armageddon)}
                />
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
                <img src={resurrection} alt="resurrection" className="rounded-circle overflow-hidden" width={70} height={70} />
            </div>
        </div>
    )
}

export default Room