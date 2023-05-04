import React, {FC, useEffect, useState} from 'react';
import {Board} from "../models/Board";
import {Cell} from "../models/Cell";
import CellComponent from "./CellComponent";
import {Player} from "../models/Player";

interface BoardProps {
    board: Board
}

const BoardComponent: FC<BoardProps> = ({board}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(board.getActivePlayer())

    function click(cell: Cell) {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell)
            setSelectedCell(null)
        }
        else {
            if (cell.figure?.color === currentPlayer?.color) {
                setSelectedCell(cell)
            }
        }
    }

    useEffect(() => {
        highlightCells()
    }, [selectedCell])

    function highlightCells() {
        board.highlightCells(selectedCell)
    }


    return (
        <div className="board">
            {board.cells.map((row, index) =>
                <React.Fragment key={index}>
                    {row.map(cell =>
                        <CellComponent
                            key={cell.id}
                            cell={cell}
                            selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                            click={click}
                        />
                    )}
                </React.Fragment>
            )}
        </div>
    );
};

export default BoardComponent;