let gameElem = document.querySelector('.game');
let container = document.querySelector('.container');

class Player {
    constructor(marker, name) {
        this.marker = marker;
    }
}

let player1 = new Player('X');
let player2 = new Player('O');
let activePlayer = player1;

let gameboard = (function createGameBoard() {
    let arr = [];
    for (let i = 0; i < 3; i++) {
        let row = [];
        for (let j = 0; j < 3; j++) {
            let button = document.createElement('button');
            button.innerHTML = ' ';
            button.setAttribute("i", i);
            button.setAttribute("j", j);
            gameElem.appendChild(button);
            row.push(button);
        }
        arr.push(row);
    }
    return arr;
})();

function printGameboard() {
    for (let i = 0; i < 3; i++) {
        let row = '';
        for (let j = 0; j < 3; j++) {
            row += gameboard[i][j] + " | ";
        }
        console.log(row);
    }
}

class GameController {

    static checkForWin(i, j) {

        if (gameboard[i][0].innerHTML != ' ' && gameboard[i][0].innerHTML == gameboard[i][1].innerHTML && gameboard[i][1].innerHTML == gameboard[i][2].innerHTML) {
            return true;
        }

        if (gameboard[0][j].innerHTML != ' ' && gameboard[0][j].innerHTML == gameboard[1][j].innerHTML && gameboard[1][j].innerHTML == gameboard[2][j].innerHTML) {
            return true;
        }

        if (gameboard[0][0].innerHTML != ' ' && gameboard[0][0].innerHTML == gameboard[1][1].innerHTML && gameboard[1][1].innerHTML == gameboard[2][2].innerHTML) {
            return true;
        }

        if (gameboard[0][2].innerHTML != ' ' && gameboard[0][2].innerHTML == gameboard[1][1].innerHTML && gameboard[1][1].innerHTML == gameboard[2][0].innerHTML) {
            return true;
        }

        return false;
    }

    static checkForTie() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (gameboard[i][j].innerHTML == ' ') {
                    return false;
                }
            }
        }
        return true;
    }
}

class ScreenController {

    static setInvisibleActivePlayer() {
        let activePlayerElem = document.querySelector('.active_player');
        activePlayerElem.classList.add('white');
    }
    static displayActivePlayer() {
        let activePlayerElem = document.querySelector('.active_player');
        activePlayerElem.classList.remove('white');
        activePlayerElem.innerHTML = `${activePlayer.marker}'s turn`;
    }

    static displayResult(s) {
        const result = document.createElement('h2');
        result.className = 'result';
        result.innerHTML = s;
        container.appendChild(result);
    }

    static removeResult() {
        let result = document.querySelector('.result');
        result.remove();
    }

    static displayReset() {
        ScreenController.setInvisibleActivePlayer();
        const reset = document.createElement('button');
        reset.className = 'reset';
        reset.innerHTML = "Reset Game";
        reset.addEventListener('click', () => {
            activePlayer = player1;
            ScreenController.displayActivePlayer();
            document.querySelectorAll('.game>button').forEach(button => {
                button.removeAttribute('disabled');
                button.innerHTML = ' ';
            });
            reset.remove();
            ScreenController.removeResult();
            ScreenController.displayActivePlayer();
        })
        container.appendChild(reset);
    }

    static disableGameButtons() {
        document.querySelectorAll('.game>button').forEach(button => {
            button.setAttribute('disabled', '');
        });
    }
}

let buttons = document.querySelectorAll('.game>button');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        button.innerHTML = activePlayer.marker;
        button.setAttribute('disabled', '');
        const i = button.getAttribute('i');
        const j = button.getAttribute('j');

        const isWon = GameController.checkForWin(i, j);
        const isTie = GameController.checkForTie();

        if (isWon) {
            ScreenController.displayResult(`${activePlayer.marker} won!`)
        }
        else if (isTie) {
            ScreenController.displayResult("It's a draw!")
        }

        if (isWon || isTie) {
            ScreenController.disableGameButtons();
            ScreenController.displayReset();
            return;
        }

        activePlayer = activePlayer == player1 ? player2 : player1;
        ScreenController.displayActivePlayer();
    })
});






