import {FigureSpell} from "models/magic/FigureSpell"
import {Figure} from "models/figures/Figure"
import {Player} from "models/game/Player"
import {SpellPhases, SpellTargets} from "models/magic/Spell"

export class Poison extends FigureSpell {
    static spellName: string = "Poison"

    constructor(caster: Player) {
        super(caster, SpellPhases.AFTER, SpellTargets.ENEMY, 9)
    }

    cast(affectedEntity: Figure): any {
        return super.cast(affectedEntity)
    }
}