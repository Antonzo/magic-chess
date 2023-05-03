import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import blackLogo from "../../assets/black-queen.png";
import whiteLogo from "../../assets/white-queen.png";

export class Queen extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell)
        this.logo = this.color === Colors.BLACK ? blackLogo : whiteLogo
        this.name = FigureNames.QUEEN
    }

    canMove(target: Cell, ignoreCheck: boolean = false): boolean {
        if (!super.canMove(target)) return false
        if (
            !this.cell.isEmptyVertical(target)
            && !this.cell.isEmptyHorizontal(target)
            && !this.cell.isEmptyDiagonal(target)
           )
            return false
        if (!ignoreCheck && this.cell.fakeStepCheck(target)) return false
        return true
    }
}