import {Figure, FigureNames} from "models/figures/Figure"
import {Colors} from "models/Colors"
import {Cell} from "models/Cell"
import blackLogo from "assets/black-pawn.png"
import whiteLogo from "assets/white-pawn.png"

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
        const stepCondition = ((target.y === this.cell.y + direction || this.isFirstStep
                && (target.y === this.cell.y + firstStepDirection))
            && target.x === this.cell.x
            && this.cell.board.getCell(target.x, target.y).isEmpty())
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