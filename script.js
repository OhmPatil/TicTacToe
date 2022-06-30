// Global declarations
let boxes = document.querySelectorAll('#box')


// Player Factory function
const playerFactory = (name, id, marker) => {
    const speak = function(){
        return `hi ${name}`
    }
    return {name, id, marker, speak}
}

// Display controller module
const displayControllerModule = () => {
    const displayResult = function(){
        document.querySelector('.result').textContent = 'X WON'
    }
    return {displayResult}
}

// Game board module
const gameBoardModule = () => {
    const gameboard = []
    boxes.forEach(box => {
        gameboard.push(box)
    })
    
    return {gameboard}
}
