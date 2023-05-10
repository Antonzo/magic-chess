import React, {FC, useEffect, useState} from 'react';
import {Player} from "models/Player";

interface TimerProps {
    player: Player
}

const Timer: FC<TimerProps> = ({player}) => {
    const [timeLeft, setTimeLeft] = useState(player.timeLeft)

    useEffect(() => {
        const observer = (updatedPlayer: Player) => {
            setTimeLeft(updatedPlayer.timeLeft)
        }
        player.addObserver(observer)
        return () => {
            player.removeObserver(observer)
        }
    }, [player])

    // const colorCaptions = player.color === 'white' ? 'White' : 'Black'

    return (
        <div className="rounded-3">{timeLeft}</div>
    );
};

export default Timer;