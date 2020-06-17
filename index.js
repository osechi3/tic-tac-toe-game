const Gameboard = (() => {

    let gameboard = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];

    const createGameboard = () => {
        const gbContainer = document.querySelector('#gameboard');

        gameboard.map((element) => {
            const div = document.createElement('div');
            div.setAttribute('data-pos', `${gameboard.indexOf(element)}`);
            div.textContent = element;
            div.classList.add('spots');
            gbContainer.appendChild(div);
        });
    };

    const startGame = () => {
        const titleContainer = document.querySelector('#title-container');
        const gameboard = document.querySelector('#gameboard');
        const playButton = document.querySelector('#play-button');
        gameboard.appendChild(titleContainer);

        playButton.addEventListener('click', () => {
            titleContainer.style.cssText = 'transform: translateY(-200%);'
            getUsersNames();
            createTurnBox();
            showWhoseTurn(player1);
            Gameboard.makeTurn(player1);
        });
    }

    const getUsersNames = () => {
        const player1InputName = document.querySelector('#name1').value
        const player2InputName = document.querySelector('#name2').value
        if (player1InputName !== '') player1.name = player1InputName;
        if (player2InputName !== '') player2.name = player2InputName;
    }

    const createTurnBox = () => {
        const main = document.querySelector('main');
        const div = document.createElement('div');
        div.setAttribute('id', 'whose-turn-box');
        main.appendChild(div);
    }

    const showWhoseTurn = (player) => {
        const whoseTurnBox = document.querySelector('#whose-turn-box');
        whoseTurnBox.textContent = `It's ${player.name}'s turn`
    }

    const makeTurn = (player) => {
        const spots = document.querySelectorAll('.spots');
        spots.forEach((spot) => {
                spot.addEventListener('click', () => {
                    if (player1.isWon == false && player2.isWon == false) { // disabling clicks after winning
                        if (player == player1 && spot.textContent !== 'X' && 
                                spot.textContent !== 'O') {
                            console.log(gameboard);
                            gameboard[gameboard.indexOf(spot.textContent)] = player.mark;
                            spot.textContent = player.mark;
                            console.log(gameboard);
                            player = player2;
                            showWhoseTurn(player2);
                        } else if (player == player2 && spot.textContent !== 'X' && 
                                spot.textContent !== 'O') {
                            console.log(gameboard);
                            gameboard[gameboard.indexOf(spot.textContent)] = player.mark;
                            spot.textContent = player.mark;
                            console.log(gameboard);
                            player = player1;
                            showWhoseTurn(player1);
                        }
                    }
                    collectMark();
                })
        })
    }

    const collectMark = () => {
        let streak1 = '';
        let streak2 = '';
        const spots = document.querySelectorAll('.spots');
        spots.forEach((spot) => {
            if (spot.textContent == 'X') {
                streak1 += spot.dataset.pos;
            } else if (spot.textContent == 'O') {
                streak2 += spot.dataset.pos;
            }
        })
        console.log(streak1);
        console.log(streak2);
        if (streak1.length >= 3 || streak2.length >= 3) {
            checkWinner(streak1, streak2)
        }
    }
    
    const checkWinner = (string1, string2) => {
        // Checking if users' strings have numbers from winning combinations
        if (
            string1.includes('0') && string1.includes('1') && string1.includes('2') ||
            string1.includes('0') && string1.includes('3') && string1.includes('6') ||
            string1.includes('0') && string1.includes('4') && string1.includes('8') ||
            string1.includes('3') && string1.includes('4') && string1.includes('5') ||
            string1.includes('1') && string1.includes('4') && string1.includes('7') ||
            string1.includes('2') && string1.includes('4') && string1.includes('6') ||
            string1.includes('6') && string1.includes('7') && string1.includes('8') ||
            string1.includes('2') && string1.includes('5') && string1.includes('8')
            ) {
            player1.isWon = true;
            console.log('Won');
            showWinScreen(player1);
        } else if (
            string2.includes('0') && string2.includes('1') && string2.includes('2') ||
            string2.includes('0') && string2.includes('3') && string2.includes('6') ||
            string2.includes('0') && string2.includes('4') && string2.includes('8') ||
            string2.includes('3') && string2.includes('4') && string2.includes('5') ||
            string2.includes('1') && string2.includes('4') && string2.includes('7') ||
            string2.includes('2') && string2.includes('4') && string2.includes('6') ||
            string2.includes('6') && string2.includes('7') && string2.includes('8') ||
            string2.includes('2') && string2.includes('5') && string2.includes('8')
        ) {
            player2.isWon = true;
            console.log('Lost');
            showWinScreen(player2);
        } else if (string1.length > 4 || string2.length > 4) {
            player1.isWon = true;
            player2.isWon = true;
            console.log('Tie');
            showWinScreen();
        }
    }

    const showWinScreen = (player) => {
        const playAgainButton = document.querySelector('#play-again-button');
        const spots = document.querySelectorAll('.spots');


        showCover(); // preventing showWinScreen function from from running more than once
        showPlayAgain(player);
        playAgainButton.addEventListener('click', () => {
            for (i = 0; i < 9; i++) {
                gameboard[i] = `${i}`;
            }
            spots.forEach((cell) => {
                cell.textContent = cell.dataset.pos;
            })
            const gbContainer = document.querySelector('#gameboard');
            const cover = document.querySelector('#cover');
            const winScreen = document.querySelector('#win-screen');
            gbContainer.removeChild(cover);
            player1.isWon = false;
            player2.isWon = false;
            winScreen.style.transform = 'translateY(-145%)';
            winScreen.style.transitionTimingFunction = 'cubic-bezier(.74,-0.5,.58,1)';
        })
    }

    const showCover = () => {
        const gbContainer = document.querySelector('#gameboard');
        const cover = document.createElement('div')
        cover.setAttribute('id', 'cover');
        gbContainer.appendChild(cover);
    }

    const showPlayAgain = (playerWon) => {
        const winScreen = document.querySelector('#win-screen');
        const gameOverMessage = document.querySelector('#game-over-message');
        if (playerWon == player1) {
            gameOverMessage.textContent = 'Player 1 Won!';
        } else if (playerWon == player2) {
            gameOverMessage.textContent = 'Player 2 Won!';
        } else {
            gameOverMessage.textContent = 'It\'s a tie';
        }
        winScreen.style.cssText = 'transform: translateY(145%);';
    }

    return {
        createGameboard,
        makeTurn,
        startGame,
        gameboard, // remove from here
    };
})();



const Player = (name, mark, isWon) => {
    return {name, mark, isWon}
}

const player1 = Player('Player1', 'X', false);
const player2 = Player('Player2', 'O', false);

const Game = (() => {

    Gameboard.createGameboard();
    Gameboard.startGame();
})();