import {Spell, SpellNames} from "models/spells/Spell"
import {Board} from "models/Board"
import {getRandomNumbersInRange} from "utils/calculations"
import {Figure} from "models/figures/Figure";

export class Armageddon extends Spell {
    affectedEntity: Board;

    constructor(board: Board, duration: number) {
        super(board, board, 1)
        this.affectedEntity = board
        this.name = SpellNames.ARMAGEDDON
    }

    apply() {
        super.apply()
        const killedFigures: Figure[] = []
        getRandomNumbersInRange(0, 63).forEach((index) => {
            const x = Math.floor(index / 8)
            const y = index % 8
            const killedFigure = this.affectedEntity.cells[x][y].figure
            if (killedFigure) {
                if (killedFigure.name === "King")
                    this.affectedEntity.endGame(killedFigure.color)
                else this.affectedEntity.killFigure(killedFigure)
            }
        })
        return killedFigures
    }
}