import logo from 'assets/figures/black-king.png'
import {Colors} from "models/game/Colors"
import {Cell} from "models/game/Cell"
import {FigureSpell} from "models/magic/FigureSpell"

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
    readonly color: Colors
    logo: typeof logo | null
    cell: Cell
    name: FigureNames
    id: number  // For react keys
    activeSpells: FigureSpell[] = []

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
        return true
    }

    moveFigure(target: Cell) {
        if (!target.game.gameInProgress) return
    }
}
