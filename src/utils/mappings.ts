const indexToChessLetter = (index: number): string => {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    return letters[index]
}

const indexToChessNumber = (index: number): string => {
    const numbers = ['8', '7', '6', '5', '4', '3', '2', '1']
    return numbers[index]
}

export { indexToChessLetter, indexToChessNumber }