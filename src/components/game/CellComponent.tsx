import React, {FC, useEffect, useState} from 'react'
import {Cell} from "models/game/Cell"
import {indexToChessLetter, indexToChessNumber} from "utils/mappings"
import "components/game/CellComponent.scss"
import {Colors} from "models/game/Colors"

interface CellProps {
    cell: Cell
    selected: boolean
    click: (cell: Cell) => void
}

const CellComponent: FC<CellProps> = ({cell, selected, click}) => {
    const [cellAvailable, setCellAvailable] = useState(cell.available)
    const [cellFigure, setCellFigure] = useState(cell.figure)

    useEffect(() => {
        const cellObserver = (cell: Cell) => {
            setCellAvailable(cell.available)
            setCellFigure(cell.figure)
        }
        cell.addObserver(cellObserver)
        return () => {
            cell.removeObserver(cellObserver)
        }
    }, [cell])

    const colorClass= (function () {
        if (cellAvailable && cellFigure)
            return 'color-chess-available'
        if (selected)
            return 'color-chess-selected'
        return `color-chess-${cell.color}`
    })()

    const colorClassOpposite = cell.color === Colors.WHITE ? 'color-chess-black' : 'color-chess-white'


    return (
        <div
            className={`cell position-relative d-flex justify-center align-center full-width bg-${colorClass}`}
            onClick={() => click(cell)}
        >
            {cellAvailable && !cellFigure && <div className="cell__step-indicator rounded-circle bg-color-chess-selected" />}
            {cellFigure?.logo && <img className="cell__figure-logo position-relative z-1" src={cellFigure.logo} draggable="false" alt={`${cellFigure.color} ${cellFigure.name} logo`} />}
            {cell.x === 0 && <p className={`position-absolute font-bold cell__label--number ${colorClassOpposite}`}>{indexToChessNumber(cell.y)}</p> }
            {cell.y === 7 && <p className={`position-absolute font-bold cell__label--letter ${colorClassOpposite}`}>{indexToChessLetter(cell.x)}</p> }
        </div>
    )
}

export default CellComponent