import {FigureSpell} from "models/magic/FigureSpell"
import {Figure} from "models/figures/Figure"
import {Player} from "models/game/Player"
import {SpellPhases, SpellTargets} from "models/magic/Spell"

export class Poison extends FigureSpell {
    affectedEntity: Figure
    static spellName: string = "Poison"

    constructor(caster: Player, figure: Figure) {
        super(caster, figure, SpellPhases.AFTER, SpellTargets.ENEMY, 4)
        this.affectedEntity = figure
    }
}