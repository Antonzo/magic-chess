import React, {FC, useEffect, useState} from 'react';
import {Cell} from "models/Cell";
import "components/CellComponent.scss"

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
        if (cellAvailable && cellFigure)
            return 'bg-color-available'
        if (selected)
            return 'bg-color-selected'
        return `bg-color-${cell.color}`
    }


    return (
        <div
            className={['cell d-flex justify-center align-center', getColorClass()].join(" ")}
            onClick={() => click(cell)}
        >
            {cellAvailable && !cellFigure && <div className="available" />}
            {cellFigure?.logo && <img className="cell__figure-logo" src={cellFigure.logo} alt="" />}
        </div>
    );
};

export default CellComponent;