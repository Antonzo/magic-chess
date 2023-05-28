import React, {FC, MouseEvent, useEffect, useState} from 'react'
import {SpellMeta} from "models/magic/SpellFactory"
import logo from "assets/magic/armageddon.png"
import "./SpellLogo.scss"

interface SpellLogoProps {
    spellMeta: SpellMeta
    size?: number
    className?: string
    onCast?: (event: MouseEvent<HTMLDivElement>) => void | null
    blockCast?: boolean
    hideAmount?: boolean
    hideCooldown?: boolean
}

const SpellLogo: FC<SpellLogoProps> = ({
    spellMeta,
    size = 70,
    className = "",
    onCast= null,
    blockCast = false,
    hideAmount = false,
    hideCooldown = false,
}) => {
    const [cooldown, setCooldown] = useState(spellMeta.cooldown)
    const [amount, setAmount] = useState(spellMeta.amount)

    useEffect(() => {
        const observer = (updatedSpellMeta: SpellMeta) => {
            setCooldown(updatedSpellMeta.cooldown)
            setAmount(updatedSpellMeta.amount)
        }
        spellMeta.addObserver(observer)
        return () => {
            spellMeta.removeObserver(observer)
        }
    }, [spellMeta])

    const spellConstructor = spellMeta.spell.prototype.constructor
    const castable = !blockCast && !!onCast && cooldown === 0

    const handleClick = (event: MouseEvent<HTMLDivElement>) => {
        if (castable)
            onCast(event)
    }

    return (
        <div className={`spell-logo position-relative ${className} ${castable ? 'cursor-pointer': ''}`} onClick={handleClick}>
            <img
                className="spell-logo__image rounded-circle"
                draggable="false"
                src={logo}
                alt={`${spellConstructor.spellName} logo`}
                width={size}
                height={size}
            />
            {!hideAmount && (
                <div className="spell-logo__amount position-absolute d-flex align-center justify-center bg-black white font-bold rounded-circle z-3">
                    {amount}
                </div>
            )}
            {!hideCooldown && cooldown > 0 && (
                <div className="spell-logo__cooldown position-absolute d-flex align-center justify-center full-width full-height rounded-circle z-2">
                    <p className="font-bold position-absolute headline-4 white pa-0">{cooldown}</p>
                </div>
            )}
        </div>
    )
}

export default SpellLogo