import {SpellPhases} from "models/magic/Spell"
import {GameSpell} from "models/magic/GameSpell"
import {Game} from "models/game/Game"
import {getRandomNumbersInRange} from "utils/calculations"
import {King} from "models/figures/King"
import armageddonLogo from "assets/magic/armageddon-spell.png"
import {Player} from "models/game/Player"


export class Armageddon extends GameSpell {
    affectedEntity: Game
    static spellName: string = "armageddon"
    static description: string = "Randomly designates five cells on a chessboard and eliminates all the pieces on those specific cells."

    constructor(caster: Player, game: Game) {
        super(caster, game, SpellPhases.INSTANT, 1)
        this.affectedEntity = game
        this.logo = armageddonLogo
    }

    cast() {
        getRandomNumbersInRange(0, 63).forEach((index) => {
            const x = Math.floor(index / 8)
            const y = index % 8
            const killedFigure = this.affectedEntity.cells[x][y].figure
            if (killedFigure) {
                if (killedFigure instanceof King)
                    this.affectedEntity.endGame(killedFigure.color)
                else this.affectedEntity.killFigure(killedFigure)
            }
        })
    }
}
