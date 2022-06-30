// Global declarations
let boxes = document.querySelectorAll('#box')
let box = document.querySelector('#box')


// Player Factory function
const playerFactory = (name, id, marker, isActive) => {
    const changeActiveStatus = function(){
        this.isActive = !this.isActive
    }
    return {name, id, marker, isActive, changeActiveStatus}
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
    const gameboard = ['', '', '', '', '', '', '', '', '']

    const renderboard = function(){
        for (let i = 0; i < 9; i++){
            boxes[i].textContent = gameboard[i]
        }
    }
    return {gameboard, renderboard}
}

// Actual game module - All Logic goes here
const game = () => {
    let newboard = gameBoardModule()
    let playerOne = playerFactory('name1', 1, 'X', true)
    let playerTwo = playerFactory('name2', 2, 'O', false)

    boxes.forEach(box => box.addEventListener('click', function(e){
        if (!playerOne.isActive) addMark(e.target.dataset.id, playerTwo.marker);
        else addMark(e.target.dataset.id, playerOne.marker)
}))

    function addMark(boxID, marker){
        if (newboard.gameboard[boxID] === ''){
            newboard.gameboard[boxID] = marker
            playerOne.changeActiveStatus()
            playerTwo.changeActiveStatus()
            newboard.renderboard()
        }
    }
}

newgame = game()

