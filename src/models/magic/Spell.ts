import {Cell} from "models/game/Cell"
import {Figure} from "models/figures/Figure"
import {Game} from "models/game/Game"
import logo from "assets/magic/armageddon.png"
import {Player} from "models/game/Player"

type AffectedEntityType = Game | Cell | Figure

enum SpellPhases {
    INSTANT = "Instant",
    BEFORE = "Before",
    AFTER = "After",
}

enum SpellTargets {
    ALLY = "Ally",
    ENEMY = "Enemy",
    ANY = "Any",
    NONE = "None",
}

class Spell {
    caster: Player
    phase: SpellPhases
    target: SpellTargets
    duration: number
    ticksLeft: number
    affectedEntity: AffectedEntityType | null = null
    static logo: typeof logo | null
    static spellName: string = "Spell"
    static description: string = ""
    id: number

    constructor(
        caster: Player,
        phase: SpellPhases,
        target: SpellTargets,
        duration: number
    ) {
        this.caster = caster
        this.phase = phase
        this.target = target
        this.duration = duration
        this.ticksLeft = duration
        this.id = Math.random()
    }

    cast(affectedEntity: AffectedEntityType, ...args: any[]): any {
        this.affectedEntity = affectedEntity
        this.add()
        this.tick()
    }

    tick() {
        if (this.ticksLeft > 0) this.ticksLeft--
        if (this.ticksLeft === 0) this.remove()
    }

    add() {
        this.affectedEntity?.activeSpells.push(this)
    }

    remove() {
        if (this.affectedEntity)
            this.affectedEntity.activeSpells = this.affectedEntity.activeSpells.filter(spell => spell.id !== this.id)
    }
}

export {Spell, SpellPhases, SpellTargets }
export type {AffectedEntityType}