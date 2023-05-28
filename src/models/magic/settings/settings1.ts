import { SpellFactory, ISpellMeta } from "models/magic/SpellFactory"
import {Armageddon} from "models/magic/spells/Armageddon"

const ArmageddonSettings: ISpellMeta<Armageddon> = {
    spell: Armageddon,
    cooldown: 8,
    cost: 15,
    amount: 1,
}


function getSpellFactory() {
    const spellFactory = new SpellFactory()
    spellFactory.push(ArmageddonSettings)
    return spellFactory
}

export { getSpellFactory }
