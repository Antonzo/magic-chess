import {Spell, SpellNames, SpellPhases} from "models/magic/Spell"
import {Game} from "models/game/Game"
import {Queen} from "models/figures/Queen"
import {Bishop} from "models/figures/Bishop"
import {Rook} from "models/figures/Rook"
import {Cell} from "models/game/Cell"

export class Poison extends Spell {
    affectedEntity: Queen | Bishop | Rook

    constructor(board: Game, affectedEntity: Queen | Bishop | Rook) {
        super(board, affectedEntity, SpellPhases.BEFORE_MOVE, 1)
        this.affectedEntity = affectedEntity
        this.name = SpellNames.POISON
    }

    apply(targetCell: Cell): boolean {
        super.apply()
        const srcCell = this.affectedEntity.cell
        const dx = Math.abs(targetCell.x - srcCell.x)
        const dy = Math.abs(targetCell.y - srcCell.y)
        return dx <= 2 && dy <= 2
    }
}