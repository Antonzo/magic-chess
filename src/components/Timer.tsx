import React, {FC, useEffect, useState} from 'react';
import {Player} from "models/Player";

interface TimerProps {
    whitePlayer: Player
    blackPlayer: Player
}

const Timer: FC<TimerProps> = ({whitePlayer, blackPlayer}) => {
    const [timeLeftWhite, setTimeLeftWhite] = useState(whitePlayer.timeLeft)
    const [timeLeftBlack, setTimeLeftBlack] = useState(blackPlayer.timeLeft)

    useEffect(() => {
        const whiteObserver = (updatedPlayer: Player) => {
            setTimeLeftWhite(updatedPlayer.timeLeft)
        }
        const blackObserver = (updatedPlayer: Player) => {
            setTimeLeftBlack(updatedPlayer.timeLeft)
        }
        whitePlayer.addObserver(whiteObserver)
        blackPlayer.addObserver(blackObserver)
        return () => {
            whitePlayer.removeObserver(whiteObserver)
            blackPlayer.removeObserver(blackObserver)
        }
    }, [whitePlayer])

    return (
        <div>
            <h2>Black - {timeLeftBlack}</h2>
            <h2>White - {timeLeftWhite}</h2>
        </div>
    );
};

export default Timer;