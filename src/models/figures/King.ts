import {Figure, FigureNames} from "models/figures/Figure";
import {Colors} from "models/Colors";
import {Cell} from "models/Cell";
import blackLogo from "assets/black-king.png";
import whiteLogo from "assets/white-king.png";

export class King extends Figure {
    isFirstStep = true

    constructor(color: Colors, cell: Cell) {
        super(color, cell)
        this.logo = this.color === Colors.BLACK ? blackLogo : whiteLogo
        this.name = FigureNames.KING
    }

    canMove(target: Cell, ignoreCheck: boolean = false): boolean {
        if (!super.canMove(target)) return false
        const dx = Math.abs(this.cell.x - target.x),
            dy = Math.abs(this.cell.y - target.y)
        if (dx > 1 || dy > 1) return false
        if (!ignoreCheck && this.cell.fakeStepCheck(target)) return false
        return true
    }

    moveFigure(target: Cell) {
        super.moveFigure(target)
        this.isFirstStep = false
    }
}