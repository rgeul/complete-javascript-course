/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, prevDice, roundScore, activePlayer, dice, gamePlaying, lastDice;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        // 1. Random 
        
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        // 2. Display result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 +'.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 +'.png';
        
        console.log('dices: '+ dice1 +" | " + dice2);
        
        if (dice1 !== 1 && dice2 !== 1)  {
            // Add to roundScore
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next Player
            nextPlayer();
        }
        console.log('rs: '+ roundScore);
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // current score to global player score
        scores[activePlayer] += roundScore;

        // update the UI
        document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];
        
        var winningScore = document.querySelector('.final-score').value;
        
        if (!winningScore) {
            winningScore = 100;
        }
        console.log(scores[activePlayer] +' | ' + winningScore);
        // check if the player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
             document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
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
    dice1 = 0;
    dice2 = 0;
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    
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
    document.getElementById('current-' + activePlayer).textContent = '0';
    document.querySelector('.player-' + activePlayer+ '-panel').classList.toggle('active');
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
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




























