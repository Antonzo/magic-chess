import React, {useState} from 'react'

import BoardComponent from "components/game/BoardComponent"
import LostFigures from "components/game/LostFigures"
import Timer from "components/game/Timer"
import SlideOutPane from "components/base/SlideOutPane"
import Button from "components/base/Button"
import SpellList from "components/magic/SpellList"
import SpellCastPanel from "components/magic/SpellCastPanel"

import FortIcon from '@mui/icons-material/Fort'
import WavingHandIcon from '@mui/icons-material/WavingHand'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled'

import {Game} from "models/game/Game"
import {SpellMeta} from "models/magic/SpellFactory"
import {Spell} from "models/magic/Spell"
import {spellsMeta1} from "models/magic/settings/settings1"

import "pages/Room.scss"


function Room() {
    // Game main
    const [game, setGame] = useState(new Game(300, spellsMeta1))

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

    const handleSpellCast = (spellMeta: SpellMeta) => {
        game.spellFactory.create(spellMeta.spell)
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
                <SpellList spellsMeta={game.spellFactory.spellsMeta} />
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
            <SpellCastPanel factory={game.spellFactory} onSpell={handleSpellCast}/>
        </div>
    )
}

export default Room