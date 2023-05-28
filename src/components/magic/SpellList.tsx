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
            {spellsMeta.map((spellMeta) => (
                <div key={spellMeta.id} className="spell-list__spell">
                    <SpellLogo
                        className="spell-list__logo"
                        spellMeta={spellMeta}
                        size={logoSize}
                        blockCast={true}
                        hideAmount={true}
                        hideCooldown={true}
                    />
                    <p className="font-bold headline-4">{spellMeta.spell.prototype.constructor.spellName}</p>
                    <p>{spellMeta.spell.prototype.constructor.description}</p>
                </div>
            ))}
        </div>
    )
}

export default SpellList