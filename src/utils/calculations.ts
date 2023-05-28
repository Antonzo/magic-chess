function getRandomNumbersInRange(a: number, b: number): number[] {
    let result = []
    for (let i = 0; i < 5; i++) {
        let randomNumber = Math.floor(Math.random() * (b - a + 1)) + a
        result.push(randomNumber)
    }
    return result
}

export { getRandomNumbersInRange }
