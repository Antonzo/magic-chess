import React, {FC, useEffect, useState} from 'react'
import {Player} from "models/Player"
import "components/game/Timer.scss"
import { formatTime } from "utils/timeUtils"

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

    const colorClasses = player.color === 'black' ? 'bg-grey-6 white' : 'bg-grey-2 black'

    return (
        <div className={`rounded-3 pa-2 ${colorClasses}`}>{formatTime(timeLeft)}</div>
    )
}


export default Timer