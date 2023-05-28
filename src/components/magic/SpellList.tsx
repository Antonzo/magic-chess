import React, {FC} from 'react'
import {SpellMeta} from "models/magic/SpellFactory"
import SpellLogo from "components/magic/SpellLogo"
import "./SpellList.scss"

interface SpellListProps {
    spellsMeta: SpellMeta[]
    logoSize?: number
}

const SpellList: FC<SpellListProps> = ({spellsMeta= [], logoSize= 70}) => {
    return (
        <div className="spell-list d-flex flex-column full-width full-height pa-6 bg-grey-3">
            {spellsMeta.map((SpellMeta) => (
                <div key={SpellMeta.id} className="spell-list__spell">
                    <SpellLogo className="spell-list__logo" spellMeta={SpellMeta} size={logoSize} />
                    <p className="font-bold headline-4">{SpellMeta.spell.prototype.constructor.spellName}</p>
                    <p>{SpellMeta.spell.prototype.constructor.description}</p>
                </div>
            ))}
        </div>
    )
}

export default SpellList