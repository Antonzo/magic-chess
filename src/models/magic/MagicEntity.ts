import {SpellNames, SpellPhases} from "models/magic/Spell"
import {Cell} from "models/game/Cell"
import {Figure} from "models/figures/Figure"
import logo from "assets/figures/black-queen.png"

type AffectedEntityType = Cell[] | Cell | Figure

export class Spell {
    affectedEntity: AffectedEntityType
    phase: SpellPhases
    logo: typeof logo | null
    duration: number
    ticksLeft: number
    name: SpellNames
    id: number

    constructor(affectedEntity: AffectedEntityType, phase: SpellPhases, duration: number) {
        this.affectedEntity = affectedEntity
        this.phase = phase
        this.duration = duration
        this.ticksLeft = duration
        this.logo = null
        this.name = SpellNames.SPELL
        this.id = Math.random()
    }

    apply(...args: any[]): any {
        if (this.ticksLeft > 0) this.ticksLeft--
    }
}