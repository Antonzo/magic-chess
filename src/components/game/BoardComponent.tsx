import React, {FC, useEffect, useState} from 'react'
import {Game} from "models/game/Game"
import {Cell} from "models/game/Cell"
import CellComponent from "components/game/CellComponent"
import "components/game/BoardComponent.scss"

interface BoardProps {
    board: Game
}

const BoardComponent: FC<BoardProps> = ({board}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)

    function click(cell: Cell) {
        const currentPlayer = board.getActivePlayer()
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
        board.highlightCells(selectedCell)
    }, [selectedCell, board])

    return (
        <div className="board">
            {board.cells.map((row, index) =>
                <React.Fragment key={index}>
                    {row.map(cell =>
                        <CellComponent
                            key={cell.id}
                            cell={cell}
                            selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y && board.gameInProgress }
                            click={click}
                        />
                    )}
                </React.Fragment>
            )}
        </div>
    )
}

export default BoardComponent