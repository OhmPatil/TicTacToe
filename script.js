// Global declarations
let boxes = document.querySelectorAll('#box')
let form = document.getElementById('actualform')
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

    const displayRestartButon = function(){
        restartButton.classList.add('show')
    }

    const hideRestartButton = function(){
        restartButton.classList.remove('show')
        restartButton.classList.add('hide')
    }
    return {displayResult, displayTurn, displayGameContainer, hideGameContainer, displayRestartButon, hideRestartButton}
}

// Form controller module
const formControllerModule = () => {
    const showform = function(){
        restartButton.classList.remove('show')
        restartButton.classList.add('hide')
        document.getElementById('form').classList.remove('hide')
    }

    const hideform = function(){
        restartButton.classList.remove('hide')
        document.getElementById('form').classList.remove('show')
        document.getElementById('form').classList.add('hide')
    }
    // const validateform = function(){
    //     // let p1name = document.getElementById('p1name').value
    //     let p1marker = document.getElementById('p1marker').value
    //     // let p2name = document.getElementById('p2name').value
    //     let p2marker = document.getElementById('p2marker').value

    //     if (p1marker === p2marker) document.getElementById('submit').disabled = true
    //     else document.getElementById('submit').disabled = false
    // }

    return {showform, hideform}
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
const game = (playerOne, playerTwo) => {
    let newboard = gameBoardModule(true)
    let displayController = displayControllerModule()

    displayController.displayRestartButon()
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
                boxes[condition[0]].classList.add('win')
                boxes[condition[1]].classList.add('win')
                boxes[condition[2]].classList.add('win')
                // displayController.hideGameContainer()
                
            }

            if (!newboard.gameboard.includes('')){
                newboard.changeBoardActiveStatus()
                displayController.displayResult('ITS A TIE')
                displayController.displayTurn('')
                // displayController.hideGameContainer()
            }

        }
    }
}


// Main global driver code
formcontroller = formControllerModule()
formcontroller.showform()

form.onsubmit = function(e){
    e.preventDefault()
    let p1name = document.getElementById('p1name').value
    let p1marker = document.getElementById('p1marker').value
    let p2name = document.getElementById('p2name').value
    let p2marker = document.getElementById('p2marker').value;

    playerOne = playerFactory(p1name, 1, p1marker, true)
    playerTwo = playerFactory(p2name, 2, p2marker, false)

    formcontroller.hideform()
    form.reset()
    newgame = game(playerOne, playerTwo)
}