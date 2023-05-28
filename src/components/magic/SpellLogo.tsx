import React, {FC, MouseEvent} from 'react'
import logo from "assets/magic/armageddon.png"
import "./SpellLogo.scss"

interface SpellLogoProps {
    logo: typeof logo
    spellName: string
    size?: number
    cooldown?: number
    className?: string
    onClick?: (event: MouseEvent<HTMLDivElement>) => void | null
}

const SpellLogo: FC<SpellLogoProps> = ({
   logo,
   spellName,
   size = 70,
   cooldown = 0,
   className = "",
   onClick= null
}) => {
    const clickable = !!onClick && cooldown === 0
    const handleClick = (event: MouseEvent<HTMLDivElement>) => {
        if (clickable)
            onClick(event)
    }
    return (
        <div className={`spell-logo position-relative ${className} ${clickable ? 'cursor-pointer': ''}`} onClick={handleClick}>
            <img
                className="spell-logo__image rounded-circle"
                draggable="false"
                src={logo}
                alt={`${spellName} logo`}
                width={size}
                height={size}
            />
            { cooldown > 0 && (
                <div className="spell-logo__cooldown position-absolute d-flex align-center justify-center full-width full-height rounded-circle z-2">
                    <p className="font-bold position-absolute headline-4 white pa-0">{cooldown}</p>
                </div>
            )}
        </div>
    )
}

export default SpellLogo