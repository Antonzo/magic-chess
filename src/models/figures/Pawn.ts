import {Figure, FigureNames} from "models/figures/Figure"
import {Colors} from "models/game/Colors"
import {Cell} from "models/game/Cell"
import blackLogo from "assets/figures/black-pawn.png"
import whiteLogo from "assets/figures/white-pawn.png"

export class Pawn extends Figure {

    isFirstStep: boolean = true

    constructor(color: Colors, cell: Cell) {
        super(color, cell)
        this.logo = this.color === Colors.BLACK ? blackLogo : whiteLogo
        this.name = FigureNames.PAWN
    }

    canMove(target: Cell, ignoreCheck: boolean = false): boolean {
        if (!super.canMove(target)) return false

        const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1
        const firstStepDirection = this.cell.figure?.color === Colors.BLACK ? 2 : -2
        // Step
        const newYShort = this.cell.y + direction,
            newYLong = this.cell.y + firstStepDirection
        const stepCondition = ((target.y === newYShort || this.isFirstStep
                && (target.y === newYLong) && this.cell.game.getCell(target.x, newYShort).isEmpty())
            && target.x === this.cell.x
            && this.cell.game.getCell(target.x, target.y).isEmpty())
        // Attack
        const attackCondition = (target.y === this.cell.y + direction
            && (target.x === this.cell.x + 1 || target.x === this.cell.x - 1)
            && this.cell.isEnemy(target))
        if (!stepCondition && !attackCondition) return false

        if (!ignoreCheck && this.cell.fakeStepCheck(target)) return false

        return true
    }

    moveFigure(target: Cell) {
        super.moveFigure(target)
        this.isFirstStep = false
    }
}