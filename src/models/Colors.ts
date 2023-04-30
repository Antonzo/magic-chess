export enum Colors {
    WHITE = "white",
    BLACK = "black",
}

export function getEnemyColor(color: Colors): Colors {
    return color === Colors.BLACK ? Colors.WHITE : Colors.BLACK
}