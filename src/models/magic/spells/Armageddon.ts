import {SpellPhases, SpellTargets} from "models/magic/Spell"
import {GameSpell} from "models/magic/GameSpell"
import {Game} from "models/game/Game"
import {getRandomNumbersInRange} from "utils/calculations"
import {King} from "models/figures/King"
import {Player} from "models/game/Player"
import armageddonLogo from "assets/magic/armageddon.png"

export class Armageddon extends GameSpell {
    static spellName: string = "Armageddon"
    static description: string = "Randomly designates five cells on a chessboard and eliminates all the pieces on these cells."
    static logo = armageddonLogo

    constructor(caster: Player) {
        super(caster, SpellPhases.INSTANT, SpellTargets.NONE, 1)
    }

    cast(affectedEntity: Game) {
        getRandomNumbersInRange(0, 63).forEach((index) => {
            const x = Math.floor(index / 8)
            const y = index % 8
            const killedFigure = affectedEntity.cells[x][y].figure
            if (killedFigure) {
                if (killedFigure instanceof King)
                    affectedEntity.endGame(killedFigure.color)
                else affectedEntity.killFigure(killedFigure)
            }
        })
    }
}
