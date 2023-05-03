import {Colors} from "./Colors";
import {Board} from "./Board";

export class Player {
    color: Colors
    board: Board
    active: boolean
    timeLeft: number
    private timer: ReturnType<typeof setInterval> | null = null

    constructor(color: Colors, board: Board, time: number) {
        this.color = color
        this.board = board
        this.timeLeft = time
        this.active = false
    }

    // public methods
    public activate() {
        this.active = true
        this.timer = setInterval(() => this.tick(), 1000) // TODO: try to be closer to the real 1 second
    }

    public deactivate() {
        this.active = false
        if (this.timer) clearInterval(this.timer)
    }

    public isActive() {
        return this.active
    }

    //private methods
    private tick() {
        this.timeLeft -= 1
    }
}