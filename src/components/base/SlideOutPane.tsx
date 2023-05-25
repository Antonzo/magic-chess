import React, {FC} from 'react'

import "components/base/SlideOutPane.scss"

interface SlideOutPaneProps {
    active: boolean
    toggle: (activeState: boolean) => void
    orientation?: "left" | "right"
    children: React.ReactNode
}

const SlideOutPane: FC<SlideOutPaneProps> = ({active, toggle, orientation="left", children}) => {
    const handleClick = () => {
        toggle(!active)
    }
    return (
        <div onClick={handleClick} className={[`slide-out-pane slide-out-pane--${orientation} full-height z-999`, active ? "slide-out-pane--active" : ""].join(" ")}>
            {children}
        </div>
    )
}

export default SlideOutPane