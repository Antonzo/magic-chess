import logo from '../../assets/black-king.png'
import {Colors} from "../Colors";
import {Cell} from "../Cell";

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

    canMove(target: Cell): boolean {
        if (this.color === target.figure?.color) return false
        return true
    }

    moveFigure(target: Cell) {}

    fakeAddFigure(target: Cell): boolean {
        const targetRealFigure = target.figure
        target.figure = this
        if (this.color === Colors.WHITE)
            target.board.calculateAttackAreasBlack()
        else
            target.board.calculateAttackAreasWhite()
        const isKingUnderAttack = target.board.isKingUnderAttack(this.color)
        target.figure = targetRealFigure
        if (this.color === Colors.WHITE)
            target.board.calculateAttackAreasBlack()
        else
            target.board.calculateAttackAreasWhite()
        return isKingUnderAttack
    }
}