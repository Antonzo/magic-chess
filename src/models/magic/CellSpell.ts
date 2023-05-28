import {Cell} from "models/game/Cell"
import {Spell, SpellPhases} from "models/magic/Spell"
import {Player} from "models/game/Player"


export class CellSpell extends Spell {
    name: string

    constructor(caster: Player, affectedEntity: Cell, phase: SpellPhases, duration: number) {
        super(caster, affectedEntity, phase, duration)
        this.name = "CellSpell"
    }
}