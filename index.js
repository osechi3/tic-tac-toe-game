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
                        } else if (player == player2 && spot.textContent !== 'X' && 
                                spot.textContent !== 'O') {
                            console.log(gameboard);
                            gameboard[gameboard.indexOf(spot.textContent)] = player.mark;
                            spot.textContent = player.mark;
                            console.log(gameboard);
                            player = player1;
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
        }
    }

    const showWinScreen = (player) => {
        
    }

    return {
        createGameboard,
        makeTurn,
    };
})();



const Player = (name, mark, isWon) => {
    return {name, mark, isWon}
}

const player1 = Player('Jeff', 'X', false);
const player2 = Player('Dave', 'O', false);

const Game = (() => {

    Gameboard.createGameboard();
    Gameboard.makeTurn(player1);
})();