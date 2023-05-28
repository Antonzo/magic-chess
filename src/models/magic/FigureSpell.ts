import {Figure} from "models/figures/Figure"
import {Spell, SpellPhases} from "models/magic/Spell"
import {Player} from "models/game/Player"


export class FigureSpell extends Spell {
    static spellName: string = "figure spell"

    constructor(caster: Player, affectedEntity: Figure, phase: SpellPhases, duration: number) {
        super(caster, affectedEntity, phase, duration)
    }
}