// Global declarations
let boxes = document.querySelectorAll('#box')
let box = document.querySelector('#box')
let restartButton = document.querySelector('.restart-button')
restartButton.addEventListener('click', function(){
    window.location.reload()
})



// Player Factory function
const playerFactory = (name, id, marker, isActive) => {
    const changeActiveStatus = function(){
        this.isActive = !this.isActive
    }
    return {name, id, marker, isActive, changeActiveStatus}
}

// Display controller module
const displayControllerModule = () => {
    const displayResult = function(string){
        document.querySelector('.result').textContent = `${string}`
    }

    const displayTurn = function(string){
        document.querySelector('.display-turn').textContent = `${string}`
    }

    const displayGameContainer = function(){
        document.querySelector('.game-container').classList.add('show')
    }

    const hideGameContainer = function(){
        document.querySelector('.game-container').classList.remove('show')
    }
    return {displayResult, displayTurn, displayGameContainer, hideGameContainer}
}

// Game board module
const gameBoardModule = (boardActive) => {
    const gameboard = ['', '', '', '', '', '', '', '', '']

    const renderboard = function(){
        for (let i = 0; i < 9; i++){
            if (gameboard[i] == 'X') boxes[i].classList.add('cross')
            else if (gameboard[i] == 'O') boxes[i].classList.add('circle')
        }
    }

    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    const changeBoardActiveStatus = function(){
        this.boardActive = !this.boardActive
    }
    return {gameboard, renderboard, winConditions, changeBoardActiveStatus, boardActive}
}

// Actual game module - All Logic goes here
const game = () => {
    let newboard = gameBoardModule(true)
    let displayController = displayControllerModule()
    let playerOne = playerFactory('Player1', 1, 'X', true)
    let playerTwo = playerFactory('Player2', 2, 'O', false)

    displayController.displayGameContainer()
    displayController.displayTurn(`${playerOne.name}'s turn`)
    boxes.forEach(box => box.addEventListener('click', function(e){
        console.log(playerOne.isActive, playerTwo.isActive, newboard.boardActive);

        if (!playerOne.isActive && newboard.boardActive) {
            displayController.displayTurn(`${playerOne.name}'s turn`)
            addMark(e.target.dataset.id, playerTwo.marker);
        }
        else if(newboard.boardActive) {
            displayController.displayTurn(`${playerTwo.name}'s turn`)
            addMark(e.target.dataset.id, playerOne.marker)
        }
    }))

    function addMark(boxID, marker){
        if (newboard.gameboard[boxID] === '' && (newboard.boardActive)){
            console.log(newboard.gameboard[boxID]);
            newboard.gameboard[boxID] = marker
            playerOne.changeActiveStatus()
            playerTwo.changeActiveStatus()
            newboard.renderboard()
            checkWin()
        }
    }

    function checkWin(){
        for (let i=0; i<=7; i++){
            let condition = newboard.winConditions[i]
            const one = newboard.gameboard[condition[0]]
            const two = newboard.gameboard[condition[1]]
            const three = newboard.gameboard[condition[2]]

            if (one === '' || two === '' || three === '') continue

            if (one === two && two === three){
                newboard.changeBoardActiveStatus()
                if (playerOne.isActive) displayController.displayResult(`${playerTwo.name} WON!`)
                else displayController.displayResult(`${playerOne.name} WON!`)
                displayController.displayTurn('')
                displayController.hideGameContainer()
                
            }

            if (!newboard.gameboard.includes('')){
                newboard.changeBoardActiveStatus()
                displayController.displayResult('ITS A TIE')
                displayController.displayTurn('')
                displayController.hideGameContainer()
            }

        }
    }
}


// newgame = game()

