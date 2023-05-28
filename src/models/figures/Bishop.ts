import {Figure, FigureNames} from "models/figures/Figure"
import {Colors} from "models/game/Colors"
import {Cell} from "models/game/Cell"
import blackLogo from "assets/figures/black-bishop.png"
import whiteLogo from "assets/figures/white-bishop.png"


export class Bishop extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell)
        this.logo = this.color === Colors.BLACK ? blackLogo : whiteLogo
        this.name = FigureNames.BISHOP
    }

    canMove(target: Cell, ignoreCheck: boolean = false): boolean {
        if (!super.canMove(target)) return false
        if (!this.cell.isEmptyDiagonal(target)) return false
        if (!ignoreCheck && this.cell.fakeStepCheck(target)) return false
        return true
    }
}