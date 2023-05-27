import logo from 'assets/figures/black-king.png'
import {Figure} from "models/figures/Figure"
import {Cell} from "models/Cell"
import {Board} from "models/Board"

export enum SpellNames {
    SPELL = "Spell",
    ARMAGEDDON = "Armageddon",
}

type AffectedEntityType = Board | Cell[] | Cell | Figure

export class Spell {
    affectedEntity: AffectedEntityType
    board: Board
    logo: typeof logo | null
    duration: number
    timeLeft: number
    name: SpellNames
    id: number

    constructor(board: Board, affectedEntity: AffectedEntityType, duration: number) {
        this.board = board
        this.affectedEntity = affectedEntity
        this.duration = duration
        this.timeLeft = duration
        this.logo = null
        this.name = SpellNames.SPELL
        this.id = Math.random()
    }

    apply() {
        if (this.timeLeft > 0) this.timeLeft--
        else this.remove()
    }

    remove() {
        this.board.activeSpells = this.board.activeSpells.filter(spell => spell.id !== this.id)
    }
}