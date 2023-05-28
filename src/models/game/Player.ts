import {Colors} from "models/game/Colors"
import {Game} from "models/game/Game"

export class Player {
    color: Colors
    game: Game
    active: boolean
    timeLeft: number
    private timer: ReturnType<typeof setInterval> | null = null
    private observers: ((player: Player) => void)[] = []

    constructor(color: Colors, game: Game, time: number) {
        this.color = color
        this.game = game
        this.timeLeft = time
        this.active = false
    }

    // public methods
    public activate() {
        this.active = true
        this.timer = setInterval(() => {
            this.tick()
        }, 1000) // TODO: try to be closer to the real 1 second
    }

    public deactivate() {
        this.active = false
        if (this.timer) clearInterval(this.timer)
    }

    public isActive() {
        return this.active
    }

    public addObserver(observer: (player: Player) => void) {
        this.observers.push(observer)
    }

    public removeObserver(observer: (player: Player) => void) {
        const index = this.observers.indexOf(observer)
        if (index !== -1) {
            this.observers.splice(index, 1)
        }
    }

    // private methods
    private tick() {
        this.timeLeft -= 1
        this.notifyObservers()
        if (this.timeLeft === 0) {
            this.game.endGame(this.color)
        }
    }

    private notifyObservers() {
        this.observers.forEach(observer => observer(this))
    }
}