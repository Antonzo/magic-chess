import {Figure, FigureNames} from "models/figures/Figure"
import {Colors} from "models/game/Colors"
import {Cell} from "models/game/Cell"
import blackLogo from "assets/figures/black-knight.png"
import whiteLogo from "assets/figures/white-knight.png"

export class Knight extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell)
        this.logo = this.color === Colors.BLACK ? blackLogo : whiteLogo
        this.name = FigureNames.KNIGHT
    }

    canMove(target: Cell, ignoreCheck: boolean = false): boolean {
        if (!super.canMove(target)) return false
        const dx = Math.abs(this.cell.x - target.x),
            dy = Math.abs(this.cell.y - target.y)

        if ((dx !== 1 || dy !== 2) && (dx !== 2 || dy !== 1))
            return false

        if (!ignoreCheck && this.cell.fakeStepCheck(target)) return false

        return true
    }
}