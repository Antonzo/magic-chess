import { Spell } from "models/magic/Spell"

export interface ISpellMeta<T extends Spell> {
    spell: (new (...args: any[]) => T)
    cooldown: number
    cost: number
    amount: number
}

export class SpellFactory {
    mana: number = 0
    spellsMeta: ISpellMeta<Spell>[] = []

    constructor(spellsMeta: ISpellMeta<Spell>[] = [], mana: number = 0) {
        this.spellsMeta = spellsMeta
        this.mana = mana
    }

    push<T extends Spell>(spellMeta: ISpellMeta<T>) {
        this.spellsMeta.push(spellMeta)
    }

    create<T extends Spell>(spellConstructor: (new (...args: any[]) => T), ...args: any[]) {
        const spellMeta = this.spellsMeta.find(spellMeta => spellMeta.spell === spellConstructor)
        if (spellMeta && spellMeta.amount > 0 && this.mana - spellMeta.cost >= 0 && spellMeta.cooldown === 0) {
            this.mana -= spellMeta.cost
            spellMeta.amount--
            spellMeta.cooldown = spellMeta.spell.prototype.duration
            return new spellConstructor(...args)
        }
    }
}


