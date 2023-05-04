import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import blackLogo from "../../assets/black-rook.png";
import whiteLogo from "../../assets/white-rook.png";

export class Rook extends Figure {
    isFirstStep = false

    constructor(color: Colors, cell: Cell) {
        super(color, cell)
        this.logo = this.color === Colors.BLACK ? blackLogo : whiteLogo
        this.name = FigureNames.ROOK
    }

    canMove(target: Cell, ignoreCheck: boolean = false): boolean {
        if (!super.canMove(target)) return false
        if (!this.cell.isEmptyVertical(target) && !this.cell.isEmptyHorizontal(target)) return false
        if (!ignoreCheck && this.cell.fakeStepCheck(target)) return false
        return true
    }

    moveFigure(target: Cell) {
        super.moveFigure(target)
        this.isFirstStep = false
    }
}