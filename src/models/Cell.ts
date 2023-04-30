import {Colors} from "./Colors";
import {Figure} from "./figures/Figure"
import {Board} from "./Board";

export class Cell {
    readonly x: number
    readonly y: number
    readonly color: Colors
    figure: Figure | null
    board: Board
    available: Boolean
    id: number // For react keys

    constructor(board: Board, x: number, y:number, color: Colors, figure: Figure | null) {
        this.x = x
        this.y = y
        this.color = color
        this.figure = figure
        this.board = board
        this.available = false
        this.id = Math.random()
    }

    isEmpty(): boolean {
        return this.figure === null
    }

    isEnemy(target: Cell): boolean {
        if (target.figure)
            return this.figure?.color !== target.figure.color
        return false
    }

    isEmptyVertical(target: Cell): boolean {
        if (this.x !== target.x) return false
        const min = Math.min(this.y, target.y),
            max = Math.max(this.y, target.y)

        for (let y = min + 1; y < max; y++) {
            if (!this.board.getCell(this.x, y).isEmpty())
                return false
        }

        return true
    }

    isEmptyHorizontal(target: Cell): boolean {
        if (this.y !== target.y) return false
        const min = Math.min(this.x, target.x),
            max = Math.max(this.x, target.x)

        for (let x = min + 1; x < max; x++) {
            if (!this.board.getCell(x, this.y).isEmpty())
                return false
        }

        return true
    }

    isEmptyDiagonal(target: Cell): boolean {
        const absX = Math.abs(target.x - this.x),
            absY = Math.abs(target.y - this.y)
        if (absX !== absY) return false

        const dy = Math.sign(target.y - this.y),
            dx = Math.sign(target.x - this.x)

        for (let i = 1; i < absY; i++)
            if (!this.board.getCell(this.x + dx*i, this.y + dy*i).isEmpty())
                return false
        return true
    }

    setFigure(figure: Figure) {
        this.figure = figure
        this.figure.cell = this
    }

    moveFigure(target: Cell) {
        if (this.figure && this.figure.canMove(target)) {
            this.figure?.moveFigure(target)
            if (target.figure) {
                this.board.addLostFigure(target.figure)
            }
            target.setFigure(this.figure)
            this.figure = null
        }
    }
}