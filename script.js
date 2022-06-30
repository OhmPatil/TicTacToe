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
    const displayResult = function(string){
        document.querySelector('.result').textContent = `${string}`
    }
    return {displayResult}
}

// Game board module
const gameBoardModule = (boardActive) => {
    const gameboard = ['', '', '', '', '', '', '', '', '']

    const renderboard = function(){
        for (let i = 0; i < 9; i++){
            boxes[i].textContent = gameboard[i]
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

    boxes.forEach(box => box.addEventListener('click', function(e){
        if (!playerOne.isActive) addMark(e.target.dataset.id, playerTwo.marker);
        else addMark(e.target.dataset.id, playerOne.marker)
    }))

    function addMark(boxID, marker){
        if (newboard.gameboard[boxID] === '' && (newboard.boardActive)){
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
            }

            if (!newboard.gameboard.includes('')){
                newboard.changeBoardActiveStatus()
                displayController.displayResult('ITS A TIE')
            }

        }
    }
}

newgame = game()

