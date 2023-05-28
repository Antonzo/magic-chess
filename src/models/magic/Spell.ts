import logo from 'assets/figures/black-king.png'
import {Figure} from "models/figures/Figure"
import {Cell} from "models/game/Cell"
import {Board} from "models/game/Board"

export enum SpellNames {
    SPELL = "Spell",
    ARMAGEDDON = "Armageddon",
    POISON = "Poison",
}

export enum SpellPhases {
    INSTANT = "Instant",
    BEFORE_MOVE = "Before move",
}

type AffectedEntityType = Board | Cell[] | Cell | Figure

export class Spell {
    affectedEntity: AffectedEntityType
    board: Board
    phase: SpellPhases
    logo: typeof logo | null
    duration: number
    timeLeft: number
    name: SpellNames
    id: number

    constructor(board: Board, affectedEntity: AffectedEntityType, phase: SpellPhases, duration: number) {
        this.board = board
        this.affectedEntity = affectedEntity
        this.phase = phase
        this.duration = duration
        this.timeLeft = duration
        this.logo = null
        this.name = SpellNames.SPELL
        this.id = Math.random()
    }

    apply(...args: any[]): any {
        if (this.timeLeft > 0) this.timeLeft--
        else this.remove()
    }

    remove() {
        this.board.activeSpells = this.board.activeSpells.filter(spell => spell.id !== this.id)
    }
}