import React, {FC, useEffect, useState} from 'react'
import {Game} from "models/game/Game"
import {Cell} from "models/game/Cell"
import CellComponent from "components/game/CellComponent"
import "components/game/BoardComponent.scss"
import {GameSpell} from "../../models/magic/GameSpell";
import {CellSpell} from "../../models/magic/CellSpell";
import {FigureSpell} from "../../models/magic/FigureSpell";
import {SpellTargets} from "../../models/magic/Spell";

interface BoardProps {
    game: Game
}

const BoardComponent: FC<BoardProps> = ({game}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)

    function click(cell: Cell) {
        const currentPlayer = game.getActivePlayer();
        const pendingSpell = game.pendingSpell;

        if (
            pendingSpell &&
            pendingSpell.caster.color === currentPlayer?.color
        ) {
            if (pendingSpell instanceof GameSpell) {
                pendingSpell.cast(cell.game)
            } else if (pendingSpell instanceof CellSpell) {
                pendingSpell.cast(cell);
            } else if (
                pendingSpell instanceof FigureSpell &&
                cell.figure &&
                cell.figure.color === currentPlayer?.color &&
                (
                    (cell.figure.color !== pendingSpell.caster.color && pendingSpell.target === SpellTargets.ENEMY) ||
                    (cell.figure.color === pendingSpell.caster.color && pendingSpell.target === SpellTargets.ALLY) ||
                    pendingSpell.target === SpellTargets.ANY
                )
            ) {
                pendingSpell.cast(cell)
            }
        } else if (
            selectedCell &&
            selectedCell !== cell &&
            selectedCell.figure?.canMove(cell)
        ) {
            selectedCell.moveFigure(cell)
            setSelectedCell(null)
        } else if (cell.figure?.color === currentPlayer?.color) {
            setSelectedCell(cell)
        }

        game.pendingSpell = null;
    }


    useEffect(() => {
        game.highlightCells(selectedCell)
    }, [selectedCell, game])

    return (
        <div className="board">
            {game.cells.map((row, index) =>
                <React.Fragment key={index}>
                    {row.map(cell =>
                        <CellComponent
                            key={cell.id}
                            cell={cell}
                            selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y && game.gameInProgress }
                            click={click}
                        />
                    )}
                </React.Fragment>
            )}
        </div>
    )
}

export default BoardComponent