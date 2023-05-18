import React, {FC, useEffect, useState} from 'react'
import {Cell} from "models/Cell"
import "components/game/CellComponent.scss"

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

    function getColorClass() {
        let color = `${cell.color}`
        if (cellAvailable && cellFigure)
            color = "available"
        if (selected)
            color = "selected"
        return `bg-color-chess-${color}`
    }


    return (
        <div
            className={['cell d-flex justify-center align-center', getColorClass()].join(" ")}
            onClick={() => click(cell)}
        >
            {cellAvailable && !cellFigure && <div className="cell__step-indicator rounded-circle bg-color-selected" />}
            {cellFigure?.logo && <img className="cell__figure-logo" src={cellFigure.logo} draggable="false" alt="" />}
        </div>
    );
};

export default CellComponent;