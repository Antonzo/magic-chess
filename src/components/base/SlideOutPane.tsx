import React, {FC} from 'react';

interface SlideOutPaneProps {
    active: boolean
    toggle: (activeState: boolean) => void
    children: React.ReactNode
}

const SlideOutPane: FC<SlideOutPaneProps> = ({active, toggle, children}) => {
    const onClickHandler = () => {
        toggle(!active)
    }
    return (
        <div onClick={onClickHandler} className={["slide-out-pane", active ? "slide-out-pane--active" : ""].join(" ")}>
            {children}
        </div>
    );
};

export default SlideOutPane;