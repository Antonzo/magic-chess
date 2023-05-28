// import {Spell, SpellNames, SpellPhases} from "models/magic/Spell"
// import {Game} from "models/game/Game"
// import {getRandomNumbersInRange} from "utils/calculations"
// import {Figure} from "models/figures/Figure"
//
//
// export class Armageddon extends Spell {
//     affectedEntity: Game
//
//     constructor(board: Game, duration: number) {
//         super(board, board, SpellPhases.INSTANT, 1)
//         this.affectedEntity = board
//         this.name = SpellNames.ARMAGEDDON
//     }
//
//     apply() {
//         super.apply()
//         const killedFigures: Figure[] = []
//         getRandomNumbersInRange(0, 63).forEach((index) => {
//             const x = Math.floor(index / 8)
//             const y = index % 8
//             const killedFigure = this.affectedEntity.cells[x][y].figure
//             if (killedFigure) {
//                 if (killedFigure.name === "King")
//                     this.affectedEntity.endGame(killedFigure.color)
//                 else this.affectedEntity.killFigure(killedFigure)
//             }
//         })
//         return killedFigures
//     }
// }

export default 2