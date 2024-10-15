document.addEventListener('DOMContentLoaded', () => {
    const stoneButton = document.getElementById('stone');
    const paperButton = document.getElementById('paper');
    const scissorsButton = document.getElementById('scissors');

    const userChoiceDisplay = document.getElementById('user-choice');
    const computerChoiceDisplay = document.getElementById('computer-choice');
    const winnerDisplay = document.getElementById('winner');

    const paperSVG = '<?xml version="1.0" encoding="utf-8"?>\n' +
        '<svg class="svg-icon" fill="#FFFFFF" width="30px" height="30px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">\n' +
        '<title>paper-plane</title>\n' +
        '<path d="M31.117 1.445c-0.009-0.018-0.026-0.029-0.036-0.046-0.069-0.131-0.155-0.243-0.258-0.338l-0.001-0.001c-0.028-0.019-0.063-0.039-0.098-0.057l-0.007-0.003c-0.021-0.015-0.029-0.043-0.052-0.057-0.030-0.019-0.067-0.013-0.099-0.030-0.131-0.071-0.285-0.12-0.448-0.136l-0.005-0c-0.035-0.007-0.079-0.013-0.123-0.016l-0.004-0c-0.211 0.001-0.409 0.055-0.582 0.15l0.006-0.003c-0.010 0.005-0.022 0.002-0.032 0.008l-27.999 16c-0.379 0.219-0.63 0.623-0.63 1.085 0 0.5 0.294 0.932 0.719 1.132l0.008 0.003 9.273 4.28v6.585c0 0.473 0.263 0.884 0.65 1.096l0.007 0.003c0.172 0.095 0.376 0.15 0.594 0.15 0.255 0 0.492-0.077 0.69-0.208l-0.005 0.003 6.027-3.955 8.764 4.045c0.153 0.072 0.333 0.115 0.523 0.115 0.659 0 1.198-0.509 1.246-1.156l0-0.004 2-28.001c0.002-0.023-0.013-0.042-0.013-0.065 0.001-0.016 0.001-0.035 0.001-0.054 0-0.191-0.043-0.372-0.121-0.533l0.003 0.007zM24.16 6.777l-12.511 14.3-6.922-3.195zM13.25 27.686v-3.117l2.788 1.287zM26.883 28.107l-7.663-3.537c-0.026-0.014-0.038-0.042-0.065-0.055l-5.115-2.373 14.448-16.514z"></path>\n' +
        '</svg>';
    const stoneSVG = '<?xml version="1.0" encoding="utf-8"?>\n' +
        '<svg class="svg-icon" width="30px" height="30px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="#000000" d="M209.875 44.156l-182 106.47 119.625 54.31 148.344 11.72 41.97-24.312 17.342 11.562L309 230.656V379.53l53.563-14.624-64.625 51.97-110.875-59.626-2.157-1.53-71.28 6.56 75.936-31.967 100.75 52.125v-147.5l-145.906-11.5-1.625-.125-1.5-.688-121.093-55V391.47L44 423.186l82 20.97 21.875-21.282 11.156 29.72 131.282 33.592V434l4.25 2.28 5.47 2.94 4.812-3.908L309 431.97v52.155L491.375 377.78v-96.405L466.78 269.47l24.595-38.75V125l-90.25 52.28-1.094 34.095-88-58.688 84.97 5.375L476.5 112 291.562 64.937l1.625.563-64.406 5.78 5.345-20.936-24.25-6.188z"/></svg>';

    const scissorsSVG = '<?xml version="1.0" encoding="utf-8"?>\n' +
        '<svg class="svg-icon" width="30px" height="30px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
        '<path fill-rule="evenodd" clip-rule="evenodd" d="M6.12133 0.878679C7.12068 1.87802 7.26759 3.407 6.56206 4.56207L16 14L15 15H12L7.5 10.5L6.56206 11.4379C7.26759 12.593 7.12068 14.122 6.12133 15.1213C5.53554 15.7071 4.76777 16 4 16H3.82843C2.26633 16 1 14.7337 1 13.1716C1 12.4214 1.29799 11.702 1.82843 11.1716L5 8L1.82843 4.82843C1.29799 4.29799 1 3.57857 1 2.82843C1 1.26633 2.26633 0 3.82843 0H4C4.76777 -3.12302e-06 5.53554 0.29289 6.12133 0.878679ZM3 3C3 3.55228 3.44772 4 4 4C4.55228 4 5 3.55228 5 3C5 2.44772 4.55228 2 4 2C3.44772 2 3 2.44772 3 3ZM4 12C3.44772 12 3 12.4477 3 13C3 13.5523 3.44772 14 4 14C4.55229 14 5 13.5523 5 13C5 12.4477 4.55228 12 4 12Z" fill="#000000"/>\n' +
        '<path d="M12 1L9 4L11.5 6.5L16 2L15 1L12 1Z" fill="#000000"/>\n' +
        '</svg>';

    function randomChoice() {
        const choices = ['Stone', 'Paper', 'Scissors'];
        const randomIndex = Math.floor(Math.random() * 3);
        return choices[randomIndex];
    }

    function chooseWinner(userChoice, computerChoice) {
        if (userChoice === computerChoice) {
            return 'It\'s a tie!';
        }

        if (
            (userChoice === 'Stone' && computerChoice === 'Scissors') ||
            (userChoice === 'Scissors' && computerChoice === 'Paper') ||
            (userChoice === 'Paper' && computerChoice === 'Stone')
        ) {
            return 'You win!';
        } else {
            return 'Computer wins!';
        }
    }

    function playGame(userChoice) {
        const computerChoice = randomChoice();
        const winner = chooseWinner(userChoice, computerChoice);

        const choiceToSVG = {
            'Stone': stoneSVG,
            'Paper': paperSVG,
            'Scissors': scissorsSVG
        };

        userChoiceDisplay.querySelector('span').innerHTML = choiceToSVG[userChoice];
        computerChoiceDisplay.querySelector('span').innerHTML = choiceToSVG[computerChoice];

        const winnerSpan = winnerDisplay.querySelector('span');
        winnerSpan.textContent = winner;

        winnerSpan.classList.remove('computer-wins', 'player-wins', 'tie');
        setTimeout(() => {
            if (winner === 'Computer wins!') {
                winnerSpan.classList.add('computer-wins');
            } else if (winner === 'You win!') {
                winnerSpan.classList.add('player-wins');
            } else if (winner === 'It\'s a tie!') {
                winnerSpan.classList.add('tie');
            }
        }, 500); // Задержка в 500 мс перед добавлением класса
    }

    stoneButton.addEventListener('click', () => {
        playGame('Stone')
    });
    paperButton.addEventListener('click', () => {
        playGame('Paper')
    });
    scissorsButton.addEventListener('click', () => {
        playGame('Scissors')
    });
});