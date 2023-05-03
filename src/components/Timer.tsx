import React, {FC} from 'react';

interface TimerProps {
    whitePlayerTime: number
    blackPlayerTime: number
}

const Timer: FC<TimerProps> = ({whitePlayerTime, blackPlayerTime}) => {
    return (
        <div>
            <h2>Black - {blackPlayerTime}</h2>
            <h2>White - {whitePlayerTime}</h2>
        </div>
    );
};

export default Timer;