const gameBoard = document.querySelector("#board")
const info = document.querySelector("#info")
let turn;

const winCombo = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

function createGameBoard() {
    const emptyTiles = " ".repeat(9).split("")
    const tileGrid = emptyTiles.map((t) => `<button class="tile"></button>`).join("");
    gameBoard.innerHTML = tileGrid
    turn = "X"
    info.textContent = `${turn}'s turn`
    gameBoard.addEventListener("click", handleGameClick)
    gameBoard.removeAttribute("inert")
}

function turnUpdate() {
    turn = turn === "X" ? "O" : "X"
    info.textContent = `${turn}'s turn`
}

function restartGame() {
    let secs = 3;
    const time = setInterval(() => {
        info.textContent = `Restarting in ${secs}`
        secs--;
        if (secs < 0) {
            clearInterval(time)
            createGameBoard()
        }
    }, 1000)
}

createGameBoard()

function displayCongrats() {
    info.textContent = `${turn}'s won`
    gameBoard.removeEventListener("click", handleGameClick)
    gameBoard.setAttribute("inert", true)
    setTimeout(restartGame, 1000)

}

function checkScore(){
    const allTiles = [...document.querySelectorAll(".tile")]
    const tileValue = allTiles.map((t) => t.dataset.value)
    const winner = winCombo.some((combo) => {
        const [a, b, c] = combo;
        return (
            tileValue[a] && 
            tileValue[a] === tileValue[b] &&
            tileValue[a] === tileValue[c]
        )
    })
    if (winner) {
        return displayCongrats()
    }
    console.log(winner)
    turnUpdate()  
}

function handleGameClick(e) {
   const valueExists = e.target.dataset.value
   if (!valueExists) {
    e.target.dataset.value = turn;
    checkScore()
    
   }
}