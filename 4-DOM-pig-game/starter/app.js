/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, prevDice, roundScore, activePlayer, dice, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        // 1. Random number
        dice[0] = Math.floor(Math.random() * 6) + 1;
        // 1. Random number
        dice[1] = Math.floor(Math.random() * 6) + 1;
        console.log(dice[0], dice[1]);
        // 2. Display result
        var diceDOM = document.querySelector('.dice');
        var diceDOM2 = document.querySelector('.dice2');
        diceDOM.style.display = 'block';
        diceDOM2.style.display = 'block';
        diceDOM.src = 'dice-' + dice[0] + '.png';
        diceDOM2.src = 'dice-' + dice[1] + '.png';
        
        // 3. Update round score if the rolled number was NOT a 1
        var roundScoreDOM = document.getElementById('current-'+activePlayer)
        for (i=0 ; i < dice.length; i++) {
            if (dice[i] === 1)  {
                deleteCurrentScore();
            } else 
                if (dice[i] === 6 && prevDice6 == true) {
                deleteEntireScore(); 
                nextPlayer();
            } else {
                roundScore += dice[i];
                roundScoreDOM.textContent = roundScore;
            }
        }
        
        if (dice.includes(6) && roundScore !== 0) {
            prevDice6 = true;
        } else {
            prevDice6 = false;
        }
        console.log('pd: '+ prevDice6);
        console.log('rs: '+ roundScore);
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // current score to global player score
        scores[activePlayer] += roundScore;

        // update the UI
        document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];

        // check if the player won the game
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();          
        }
    }
});


document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [ 0,0];
    dice = [ 0,0];
    prevDice6 = false;
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
    
    document.getElementById('score-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
        
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

function nextPlayer() {
    document.querySelector('.player-' + activePlayer+ '-panel').classList.toggle('active');
    console.log('cs: '+ document.getElementById('current-' + activePlayer).textContent);
    document.getElementById('current-' + activePlayer).textContent = '0';
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    prevDice6 = false;
    document.getElementById('current-' + activePlayer).textContent = '0';
    document.querySelector('.player-' + activePlayer+ '-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
}

function deleteCurrentScore() {
    document.getElementById('current-' + activePlayer).textContent = '0';
    roundScore = 0;
}

function deleteEntireScore() {
    document.getElementById('current-' + activePlayer).textContent = '0';
    document.getElementById('score-' + activePlayer).textContent = '0';
    roundScore = 0; 
}







//console.log(dice);
//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//var x = document.querySelector('#score-0').textContent;
//console.log(x);




























