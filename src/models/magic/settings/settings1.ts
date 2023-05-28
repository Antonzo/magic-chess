import { ISpellMeta } from "models/magic/SpellFactory"
import {Armageddon} from "models/magic/spells/Armageddon"

const ArmageddonSettings: ISpellMeta<Armageddon> = {
    spell: Armageddon,
    cooldown: 8,
    cost: 15,
    amount: 1,
    id: Math.random()
}

const spellMetaList = [ArmageddonSettings]

export { spellMetaList }
