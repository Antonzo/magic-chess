import logo from 'assets/figures/black-king.png'
import {Colors} from "models/game/Colors"
import {Cell} from "models/game/Cell"
import {SpellPhases} from "models/magic/Spell"

export enum FigureNames {
    FIGURE = "Figure",
    KING = "King",
    QUEEN = "Queen",
    ROOK = "Rook",
    BISHOP = "Bishop",
    KNIGHT = "Knight",
    PAWN = "Pawn",
}

export class Figure {
    color: Colors
    logo: typeof logo | null
    cell: Cell
    name: FigureNames
    id: number


    constructor(color: Colors, cell: Cell) {
        this.color = color
        this.cell = cell
        this.cell.figure = this
        this.logo = null
        this.name = FigureNames.FIGURE
        this.id = Math.random()
    }

    canMove(target: Cell, ignoreCheck: boolean = false): boolean {
        if (this.color === target.figure?.color) return false
        const appliedSpells = this.cell.board.activeSpells.filter(spell => spell.phase === SpellPhases.BEFORE_MOVE && spell.affectedEntity === this)
        const canMoveAfterSpells = appliedSpells.map(spell => spell.apply(target)).reduce((accumulator, currentValue) => accumulator && currentValue, true)
        if (!canMoveAfterSpells) return false
        return true
    }

    moveFigure(target: Cell) {
        if (!target.board.gameInProgress) return
    }
}
