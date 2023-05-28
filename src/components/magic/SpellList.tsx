import React, {FC} from 'react'
import {Spell} from "models/magic/Spell"
import {ISpellMeta} from "models/magic/SpellFactory"
import "./SpellList.scss"
import SpellLogo from "./SpellLogo";

interface SpellListProps {
    spellsMeta: ISpellMeta<Spell>[]
    logoSize?: number
}

const SpellList: FC<SpellListProps> = ({spellsMeta= [], logoSize= 70}) => {
    return (
        <div className="spell-list d-flex flex-column full-width full-height pa-6 bg-grey-3">
            {spellsMeta.map(({spell, id}) => (
                <div key={id} className="spell-list__spell">
                    <SpellLogo
                        className="spell-list__spell__logo"
                        logo={spell.prototype.constructor.logo}
                        spellName={spell.prototype.constructor.spellName}
                        size={logoSize}
                    />
                    <p className="spell-list__spell__name font-bold headline-4">{spell.prototype.constructor.spellName}</p>
                    <p className="spell-list__spell__description">{spell.prototype.constructor.description}</p>
                </div>
            ))}
        </div>
    )
}

export default SpellList