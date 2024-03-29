import {Cell} from "models/game/Cell"
import {Colors} from "models/game/Colors"
import {GameOutcome} from "models/game/GameOutcome"
import {Pawn} from "models/figures/Pawn"
import {King} from "models/figures/King"
import {Queen} from "models/figures/Queen"
import {Bishop} from "models/figures/Bishop"
import {Rook} from "models/figures/Rook"
import {Knight} from "models/figures/Knight"
import {Figure} from "models/figures/Figure"
import {Player} from "models/game/Player"
import {GameSpell} from "models/magic/GameSpell"
import {Spell, SpellPhases, SpellTargets} from "models/magic/Spell"
import {SpellFactory, SpellMeta} from "models/magic/SpellFactory"

export class Game {
    cells: Cell[][] = []
    cellsUnderWhiteAttack: Cell[] = []
    cellsUnderBlackAttack: Cell[] = []
    activeBlackFigures: Figure[] = []
    activeWhiteFigures: Figure[] = []
    lostBlackFigures: Figure[] = []
    lostWhiteFigures: Figure[] = []
    blackKing: King
    whiteKing: King
    blackPlayer: Player
    whitePlayer: Player
    gameInProgress: boolean = false
    activeSpells: GameSpell[] = []
    spellFactoryWhite: SpellFactory
    spellFactoryBlack: SpellFactory
    pendingSpell: Spell | null = null

    constructor(time: number = 300, spellsMeta: SpellMeta[] = [], mana: number = 100) {
        this.whitePlayer = new Player(Colors.WHITE, this, time)
        this.blackPlayer = new Player(Colors.BLACK, this, time)
        this.initCells()
        this.blackKing = new King(Colors.BLACK, this.getCell(4, 0))
        this.whiteKing = new King(Colors.WHITE, this.getCell(4, 7))
        this.addFigures()
        this.initActiveFigures()
        const spellsMetaCopy1 = [...spellsMeta.map(spellMeta => spellMeta.copy())]
        const spellsMetaCopy2 = [...spellsMeta.map(spellMeta => spellMeta.copy())]
        this.spellFactoryWhite = new SpellFactory(spellsMetaCopy1, mana)
        this.spellFactoryBlack = new SpellFactory(spellsMetaCopy2, mana)
    }

    public start() {
        if (this.gameInProgress) return
        this.gameInProgress = true
        this.whitePlayer.activate()
    }

    public getActivePlayer(): Player | null {
        if (this.whitePlayer.isActive()) return this.whitePlayer
        if (this.blackPlayer.isActive()) return this.blackPlayer
        return null
    }

    public swapPlayers(currentPlayerColor: Colors) {
        if (currentPlayerColor === Colors.WHITE) {
            this.whitePlayer.deactivate()
            this.blackPlayer.activate()
        } else {
            this.blackPlayer.deactivate()
            this.whitePlayer.activate()
        }
        this.applyActiveSpells(currentPlayerColor)
        this.spellFactoryWhite.tick()
        this.spellFactoryBlack.tick()
    }

    public highlightCells(selectedCell: Cell | null) {
        for (let i = 0; i < this.cells.length; i ++) {
            const row = this.cells[i]
            for (let j = 0; j < row.length; j++) {
                const target = row[j]
                target.setAvailable(!!selectedCell?.figure?.canMove(target))
            }
        }
    }

    public getCell(x: number, y: number) {
        return this.cells[y][x]
    }

    public killFigure(figure: Figure) {
        figure.cell.setFigure(null)
        if (figure.color === Colors.BLACK) {
            this.lostBlackFigures.push(figure)
            this.activeBlackFigures = this.activeBlackFigures.filter(f => f.id !== figure.id)
        } else {
            this.lostWhiteFigures.push(figure)
            this.activeWhiteFigures = this.activeWhiteFigures.filter(f => f.id !== figure.id)
        }
    }

    public calculateAttackAreasWhite(ignoreCheck: boolean = false, ignoreFigures: Figure[] = []) {
        this.cellsUnderWhiteAttack = []
        this.activeWhiteFigures.filter(figure => !ignoreFigures.includes(figure)).forEach(figure => {
            this.cells.forEach(row =>
                row.forEach(cell => {
                    if (figure.canMove(cell, ignoreCheck))
                        this.cellsUnderWhiteAttack.push(cell)
                })
            )
        })
    }

    public calculateAttackAreasBlack(ignoreCheck: boolean = false, ignoreFigures: Figure[] = []) {
        this.cellsUnderBlackAttack = []
        this.activeBlackFigures.filter(figure => !ignoreFigures.includes(figure)).forEach(figure => {
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

    public endGame(outcome: GameOutcome) {
        this.gameInProgress = false
        this.whitePlayer.deactivate()
        this.blackPlayer.deactivate()
        console.log(`Game over! ${outcome}`) // TODO: proper logic
        return outcome
    }

    public changeGameState(currentPlayerColor: Colors): void {
        if (currentPlayerColor === Colors.WHITE)
            this.calculateAttackAreasBlack()
        else
            this.calculateAttackAreasWhite()
        this.swapPlayers(currentPlayerColor)
        const gameStatus = this.endGameStatus(currentPlayerColor)
        if (gameStatus)
            this.endGame(gameStatus)
    }

    public processSpellCreation(color: Colors, spellMeta: SpellMeta | null) {
        if (spellMeta === null) {
            this.pendingSpell = null
            return
        }
        let createdSpell: Spell | null = null
        if (color === Colors.WHITE)
            createdSpell = this.spellFactoryWhite.create(spellMeta.spell, [this.whitePlayer])
        else
            createdSpell = this.spellFactoryBlack.create(spellMeta.spell, [this.whitePlayer])
        if (createdSpell) {
            if (createdSpell.target === SpellTargets.NONE && createdSpell.phase === SpellPhases.INSTANT) {
                createdSpell.cast(this)
            } else {
                this.pendingSpell = createdSpell
            }
        }
    }


    // private methods
    private initCells() {
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

    private addFigures() {
        this.addQueens()
        this.addRooks()
        this.addBishops()
        this.addKnights()
        this.addPawns()
    }

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

    private initActiveFigures() {
        this.cells.forEach(row =>
            row.forEach(cell => {
                if (cell.figure) {
                    cell.figure.color === Colors.WHITE
                        ? this.activeWhiteFigures.push(cell.figure)
                        : this.activeBlackFigures.push(cell.figure)
                }
            })
        )
    }

    private endGameStatus(currentPlayerColor: Colors): GameOutcome | null {
        if (currentPlayerColor === Colors.BLACK && this.cellsUnderWhiteAttack.length === 0) {
            if (this.isKingUnderAttack(Colors.WHITE)) {
                return Colors.WHITE
            }
            return "draw"
        }
        if (currentPlayerColor === Colors.WHITE && this.cellsUnderBlackAttack.length === 0) {
            if (this.isKingUnderAttack(Colors.BLACK)) {
                return Colors.BLACK
            }
            return "draw"
        }
        return null
    }

    private applyActiveSpells(currentPlayerColor: Colors) {
        this.activeSpells.filter(
            (spell) => spell.caster.color === currentPlayerColor && spell.phase === SpellPhases.AFTER ||
                spell.caster.color !== currentPlayerColor && spell.phase === SpellPhases.BEFORE
        ).forEach(spell => spell.tick())
    }
}