import { Spell } from "models/magic/Spell"


export class SpellMeta {
    id: number
    private observers: ((spellMeta: SpellMeta) => void)[] = []

    constructor(public spell: (new (...args: any[]) => Spell),
                public cooldown: number,
                public cost: number,
                public amount: number
    ) {
        this.id = Math.random()
    }

    public addObserver(observer: (spellMeta: SpellMeta) => void) {
        this.observers.push(observer)
    }

    public removeObserver(observer: (spellMeta: SpellMeta) => void) {
        const index = this.observers.indexOf(observer)
        if (index !== -1) {
            this.observers.splice(index, 1)
        }
    }

    public notifyObservers() {
        this.observers.forEach(observer => observer(this))
    }
}

export class SpellFactory {
    mana: number = 0
    spellsMeta: SpellMeta[] = []

    constructor(spellsMeta: SpellMeta[] = [], mana: number = 0) {
        this.spellsMeta = spellsMeta
        this.mana = mana
    }

    push(spellMeta: SpellMeta) {
        this.spellsMeta.push(spellMeta)
    }

    load(spellsMeta: SpellMeta[] = []) {
        spellsMeta.forEach(spellMeta => this.push(spellMeta))
    }

    create(spellConstructor: (new (...args: any[]) => Spell), ...args: any[]) {
        const spellMeta = this.spellsMeta.find(spellMeta => spellMeta.spell === spellConstructor)
        if (spellMeta && spellMeta.amount > 0 && this.mana - spellMeta.cost >= 0 && spellMeta.cooldown === 0) {
            this.mana -= spellMeta.cost
            spellMeta.amount--
            spellMeta.cooldown = spellMeta.spell.prototype.duration
            spellMeta.notifyObservers()
            return new spellConstructor(...args)
        }
    }

    tick() {
        this.spellsMeta.forEach(spellMeta => {
            if (spellMeta.cooldown > 0) {
                spellMeta.cooldown--
                spellMeta.notifyObservers()
            }
        })
    }
}


