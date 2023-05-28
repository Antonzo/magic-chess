import {Game} from "models/game/Game"
import {Spell, SpellPhases} from "models/magic/Spell"
import {Player} from "models/game/Player"


export class GameSpell extends Spell {
    name: string

    constructor(caster: Player, affectedEntity: Game, phase: SpellPhases, duration: number) {
        super(caster, affectedEntity, phase, duration)
        this.name = "GameSpell"
    }
}