import logo from 'assets/black-king.png'
import {Colors} from "models/Colors"
import {Cell} from "models/Cell"

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
        return true
    }

    moveFigure(target: Cell) {
        if (!target.board.gameInProgress) return
        target.board.changeGameState(this.color)
    }
}
