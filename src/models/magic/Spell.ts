import {Cell} from "models/game/Cell"
import {Figure} from "models/figures/Figure"
import {Game} from "models/game/Game"
import logo from "assets/magic/armageddon-spell.png"
import {Player} from "models/game/Player"

type AffectedEntityType = Game | Cell | Figure

export enum SpellPhases {
    INSTANT = "Instant",
    BEFORE = "Before",
    AFTER = "After",
}

export class Spell {
    affectedEntity: AffectedEntityType
    caster: Player
    phase: SpellPhases
    logo: typeof logo | null
    duration: number
    ticksLeft: number
    name: string
    description: string
    id: number  // For react keys

    constructor(caster: Player, affectedEntity: AffectedEntityType, phase: SpellPhases, duration: number) {
        this.caster = caster
        this.affectedEntity = affectedEntity
        this.phase = phase
        this.logo = null
        this.name = "Spell"
        this.duration = duration
        this.ticksLeft = duration
        this.description = ""
        this.id = Math.random()
        this.add()
        if (this.phase === SpellPhases.INSTANT) this.cast()
    }

    cast(...args: any[]): any {
        this.tick()
    }

    tick() {
        if (this.ticksLeft > 0) this.ticksLeft--
        if (this.ticksLeft === 0) this.remove()
    }

    add() {
        this.affectedEntity.activeSpells.push(this)
    }

    remove() {
        this.affectedEntity.activeSpells = this.affectedEntity.activeSpells.filter(spell => spell.id !== this.id)
    }
}