import React, {FC, useEffect, useState} from 'react'
import {SpellMeta, SpellFactory} from "models/magic/SpellFactory"
import SpellLogo from "components/magic/SpellLogo"
import "./SpellCastPanel.scss"

interface SpellCastingPanelProps {
    factory: SpellFactory
    logoSize?: number
    onSpell?: (spellM: SpellMeta) => void | null
    blockCast?: boolean
}

const SpellCastPanel: FC<SpellCastingPanelProps> = ({
    factory,
    logoSize= 70,
    onSpell= null,
    blockCast = false
}) => {
    const [spellsMeta, setSpellsMeta] = useState(factory.spellsMeta)

    useEffect(() => {
        setSpellsMeta(factory.spellsMeta)
    }, [factory.spellsMeta])

    function handleClick(spellMeta: SpellMeta) {
        if (onSpell)
            onSpell(spellMeta)
    }
    return (
        <div className="spell-casting-panel d-flex flex-wrap align-center justify-center full-width mt-4">
            {spellsMeta.map((spellMeta) => (
                <SpellLogo
                    key={spellMeta.id}
                    spellMeta={spellMeta}
                    className="spell-casting-panel__logo"
                    blockCast={blockCast}
                    onCast={() => handleClick(spellMeta)}
                />
            ))}
        </div>
    )
}

export default SpellCastPanel