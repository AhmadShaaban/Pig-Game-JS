/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
- if you got two 6 in row your entire score will be zero
*/
alert("- The game has 2 players, playing in rounds \n -In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score \n BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn \n -The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn \n -The first player to reach 100 points on GLOBAL score wins the game \n -if you got two 6 in row your entire score will be zero");


var scores, currentScore, currentPlayer,random,flag,prev;
function init(){
    scores = [0,0];
    currentScore = 0;
    flag = true;
    currentPlayer = 0;
    document.querySelector('#score-0').textContent = 0;
    document.querySelector('#score-1').textContent = 0;
    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#current-1').textContent = 0;
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.player-0-panel').classList.remove('active') ;
    document.querySelector('.player-1-panel').classList.remove ('active');
    document.querySelector('.player-0-panel').classList.add('active') ;
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    prev = 0;
    
}

function changePlayer(){
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('#current-'+currentPlayer).textContent = 0;
    document.querySelector('.player-0-panel').classList.toggle('active') ;
    document.querySelector('.player-1-panel').classList.toggle ('active');
    currentPlayer = 1 - currentPlayer;
    currentScore = 0;
    prev = 0;
}
init();

document.querySelector('.btn-roll').addEventListener('click',function (){
    if (flag){
        random = (Math.floor(Math.random() * 6)) + 1;
        document.querySelector('.dice').style.display = 'block';
        document.querySelector('.dice').src = 'dice-' + random + '.png';
        if (random == 1){
            changePlayer();
        }
        else{
            if (random === 6 && prev === 6){
                scores[currentPlayer] = 0;
                currentScore = 0;
                document.querySelector('#score-'+currentPlayer).textContent = scores[currentPlayer];
                changePlayer();
            }
            else{
                currentScore += random;
                document.querySelector('#current-'+currentPlayer).textContent = currentScore;
                prev = random;
                }
        }
    }

});

document.querySelector('.btn-hold').addEventListener('click',function(){
    if (flag){
        scores[currentPlayer] += currentScore;
        document.querySelector('#score-'+currentPlayer).textContent = scores[currentPlayer];
        if (scores[currentPlayer] >= 100){
            flag = false;
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('#name-' + currentPlayer).textContent = 'Winner!';
        }
        else
            changePlayer();
    }
});

document.querySelector('.btn-new').addEventListener('click',function(){
    init();
});