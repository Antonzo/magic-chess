import {Cell} from "./Cell";
import {Colors} from "./Colors";
import {Pawn} from "./figures/Pawn";
import {King} from "./figures/King";
import {Queen} from "./figures/Queen";
import {Bishop} from "./figures/Bishop";
import {Rook} from "./figures/Rook";
import {Knight} from "./figures/Knight";
import {Figure} from "./figures/Figure";

export class Board {
    cells: Cell[][] = []
    cellsUnderWhiteAttack: Cell[] = []
    cellsUnderBlackAttack: Cell[] = []
    lostBlackFigures: Figure[] = []
    lostWhiteFigures: Figure[] = []
    blackKing: King | null = null
    whiteKing: King | null = null


    // Public methods
    public initCells() {
        for (let i = 0; i < 8; i++) {
            const row: Cell[] = []
            for (let j = 0; j < 8; j++) {
                if ((i + j) % 2 !== 0)
                    row.push(new Cell(this, j, i, Colors.BLACK, null)) // Black
                else row.push(new Cell(this, j, i, Colors.WHITE, null)) // White
            }
            this.cells.push(row)
        }
    }

    public highlightCells(selectedCell: Cell | null) {
        for (let i = 0; i < this.cells.length; i ++) {
            const row = this.cells[i]
            for (let j = 0; j < row.length; j++) {
                const target = row[j]
                target.available = !!selectedCell?.figure?.canMove(target)
            }
        }
    }

    public getCopyBoard(): Board {
        const newBoard = new Board()
        newBoard.cells = this.cells
        newBoard.lostWhiteFigures = this.lostWhiteFigures
        newBoard.lostBlackFigures = this.lostBlackFigures
        return newBoard
    }

    public getCell(x: number, y: number) {
        return this.cells[y][x]
    }

    public addFigures() {
        this.addKings()
        this.addQueens()
        this.addRooks()
        this.addBishops()
        this.addKnights()
        this.addPawns()
    }

    public addLostFigure(figure: Figure) {
        figure.color === Colors.BLACK
            ? this.lostBlackFigures.push(figure)
            : this.lostWhiteFigures.push(figure)
    }

    public calculateAttackAreasWhite(ignoreCheck: boolean = false) {
        this.cellsUnderWhiteAttack = []
        let whiteFigures: Figure[] = []
        this.cells.forEach(row =>
            row.forEach(cell => {
                if (cell.figure?.color === Colors.WHITE)
                    whiteFigures.push(cell.figure)
            })
        )
        whiteFigures.forEach(figure => {
            this.cells.forEach(row =>
                row.forEach(cell => {
                    if (figure.canMove(cell, ignoreCheck))
                        this.cellsUnderWhiteAttack.push(cell)
                })
            )
        })
    }

    public calculateAttackAreasBlack(ignoreCheck: boolean = false) {
        this.cellsUnderBlackAttack = []
        let blackFigures: Figure[] = []
        this.cells.forEach(row =>
            row.forEach(cell => {
                if (cell.figure?.color === Colors.BLACK)
                    blackFigures.push(cell.figure)
            })
        )
        blackFigures.forEach(figure => {
            this.cells.forEach(row =>
                row.forEach(cell => {
                    if (figure.canMove(cell, ignoreCheck))
                        this.cellsUnderBlackAttack.push(cell)
                })
            )
        })
    }

    public isKingUnderAttack(color: Colors): boolean {
        const king = color === Colors.WHITE ? this.whiteKing : this.blackKing
        if (!king) return false
        const attackArea = color === Colors.WHITE ? this.cellsUnderBlackAttack : this.cellsUnderWhiteAttack
        return !!attackArea.includes(king.cell)
    }

    // Private methods
    private addPawns() {
        for (let i = 0; i < 8; i++) {
            new Pawn(Colors.BLACK, this.getCell(i, 1))
            new Pawn(Colors.WHITE, this.getCell(i, 6))
        }
    }

    private addKnights() {
        new Knight(Colors.BLACK, this.getCell(1, 0))
        new Knight(Colors.BLACK, this.getCell(6, 0))
        new Knight(Colors.WHITE, this.getCell(1, 7))
        new Knight(Colors.WHITE, this.getCell(6, 7))
    }

    private addBishops() {
        new Bishop(Colors.BLACK, this.getCell(2, 0))
        new Bishop(Colors.BLACK, this.getCell(5, 0))
        new Bishop(Colors.WHITE, this.getCell(2, 7))
        new Bishop(Colors.WHITE, this.getCell(5, 7))
    }

    private addRooks() {
        new Rook(Colors.BLACK, this.getCell(0, 0))
        new Rook(Colors.BLACK, this.getCell(7, 0))
        new Rook(Colors.WHITE, this.getCell(0, 7))
        new Rook(Colors.WHITE, this.getCell(7, 7))
    }

    private addQueens() {
        new Queen(Colors.BLACK, this.getCell(3, 0))
        new Queen(Colors.WHITE, this.getCell(3, 7))
    }

    private addKings() {
        this.blackKing = new King(Colors.BLACK, this.getCell(4, 0))
        this.whiteKing = new King(Colors.WHITE, this.getCell(4, 7))
    }
}