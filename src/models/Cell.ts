import {Colors} from "models/Colors"
import {Figure} from "models/figures/Figure"
import {Board} from "models/Board"

export class Cell {
    readonly x: number
    readonly y: number
    readonly color: Colors
    figure: Figure | null
    board: Board
    available: Boolean
    id: number // For react keys
    private observers: ((cell: Cell) => void)[] = []

    constructor(board: Board, x: number, y:number, color: Colors, figure: Figure | null) {
        this.x = x
        this.y = y
        this.color = color
        this.figure = figure
        this.board = board
        this.available = false
        this.id = Math.random()
    }


    // public methods
    public addObserver(observer: (cell: Cell) => void) {
        this.observers.push(observer)
    }

    public removeObserver(observer: (cell: Cell) => void) {
        const index = this.observers.indexOf(observer)
        if (index !== -1) {
            this.observers.splice(index, 1)
        }
    }

    public isEmpty(): boolean {
        return this.figure === null
    }

    public isEnemy(target: Cell): boolean {
        if (target.figure)
            return this.figure?.color !== target.figure.color
        return false
    }

    public isEmptyVertical(target: Cell): boolean {
        if (this.x !== target.x) return false
        const min = Math.min(this.y, target.y),
            max = Math.max(this.y, target.y)

        for (let y = min + 1; y < max; y++) {
            if (!this.board.getCell(this.x, y).isEmpty())
                return false
        }

        return true
    }

    public isEmptyHorizontal(target: Cell): boolean {
        if (this.y !== target.y) return false
        const min = Math.min(this.x, target.x),
            max = Math.max(this.x, target.x)

        for (let x = min + 1; x < max; x++) {
            if (!this.board.getCell(x, this.y).isEmpty())
                return false
        }

        return true
    }

    public isEmptyDiagonal(target: Cell): boolean {
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

    public setFigure(figure: Figure) {
        this.figure = figure
        this.figure.cell = this
        this.notifyObservers()
    }

    public setAvailable(available: boolean) {
        this.available = available
        this.notifyObservers()
    }

    public moveFigure(target: Cell) {
        if (this.figure && this.figure.canMove(target)) {
            this.figure?.moveFigure(target)
            if (target.figure) {
                this.board.addLostFigure(target.figure)
            }
            target.setFigure(this.figure)
            this.figure = null
            this.board.calculateAttackAreasWhite()
            this.board.calculateAttackAreasBlack()
        }
    }

    public fakeStepCheck(target: Cell): boolean {
        if (this.figure === null) return false
        const targetFigure = target.figure
        this.figure.cell = target
        target.figure = this.figure
        this.figure = null
        if (target.figure.color === Colors.WHITE)
            target.board.calculateAttackAreasBlack(true)
        else
            target.board.calculateAttackAreasWhite(true)
        const isKingUnderAttack = target.board.isKingUnderAttack(target.figure.color)
        this.figure = target.figure
        this.figure.cell = this
        target.figure = targetFigure
        if (this.figure.color === Colors.WHITE)
            target.board.calculateAttackAreasBlack(true)
        else
            target.board.calculateAttackAreasWhite(true)
        return isKingUnderAttack
    }

    // private methods
    private notifyObservers() {
        this.observers.forEach(observer => observer(this))
    }
}