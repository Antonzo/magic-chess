import {Figure, FigureNames} from "./Figure";
import {Colors, getEnemyColor} from "../Colors";
import {Cell} from "../Cell";
import blackLogo from "../../assets/black-king.png";
import whiteLogo from "../../assets/white-king.png";

export class King extends Figure {
    isFirstStep = true

    constructor(color: Colors, cell: Cell) {
        super(color, cell)
        this.logo = this.color === Colors.BLACK ? blackLogo : whiteLogo
        this.name = FigureNames.KING
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target)) return false
        const dx = Math.abs(this.cell.x - target.x),
            dy = Math.abs(this.cell.y - target.y)
        if (dx > 1 || dy > 1) return false
        if (!target.isUnderAttackBy(getEnemyColor(this.color)))
            return true
        return false
    }

    moveFigure(target: Cell) {
        super.moveFigure(target)
        this.isFirstStep = false
    }
}