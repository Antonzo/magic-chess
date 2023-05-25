import React, {FC, MouseEvent} from 'react'

import "styles/animations/_ripple.scss"
import "components/base/Button.scss"

interface ButtonProps {
    size?: "small" | "medium" | "large",
    disabled?: boolean,
    ripple?: boolean,
    children?: React.ReactNode
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}
const Button: FC<ButtonProps> = ({
    disabled = false,
    ripple = true,
    size = 'medium',
    onClick,
    children,
}) => {

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        if (onClick && !disabled) {
            onClick(event)
        }
    }

    const getSizeClassName = (size?: "small" | "medium" | "large") => {
        return `btn--${size}`
    }

    return (
        <button className={["btn ripple", disabled ? "btn--disabled" : "", getSizeClassName(size)].join(" ")} onClick={handleClick}>
            <span className="btn__content">
                {children}
            </span>
        </button>
    );
};

export default Button