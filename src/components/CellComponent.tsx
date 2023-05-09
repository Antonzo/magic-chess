import React, {FC, useEffect, useState} from 'react';
import {Cell} from "../models/Cell";

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

    return (
        <div
            className={['cell', cell.color, selected ? "selected" : ""].join(" ")}
            onClick={() => click(cell)}
            style={{background: cellAvailable && cellFigure ? 'green' : ''}}
        >
            {cellAvailable && !cellFigure && <div className="available" />}
            {cellFigure?.logo && <img src={cellFigure.logo} alt="" />}
        </div>
    );
};

export default CellComponent;