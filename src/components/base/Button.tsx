import React, {FC} from 'react'

import "styles/animations/_ripple.scss"
import "components/base/Button.scss"

interface ButtonProps {
    size?: "small" | "medium" | "large",
    disabled?: boolean,
    ripple?: boolean,
    children?: React.ReactNode
}
const Button: FC<ButtonProps> = ({disabled, ripple, size, children}) => {

    const getSizeClassName = (size?: "small" | "medium" | "large") => {
        return `btn--${size}`
    }

    return (
        <button className={["btn ripple", disabled ? "btn--disabled" : "", getSizeClassName(size)].join(" ")}>
            <span className="btn__content">
                {children}
            </span>
        </button>
    );
};

Button.defaultProps = {
    size: "medium",
    disabled: false,
    ripple: true,
    children: null
}

export default Button