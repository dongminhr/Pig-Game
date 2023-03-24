'use strict';

// Selecting elments
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew =document.querySelector('.btn--new');
const btnRoll =document.querySelector('.btn--roll');
const btnHold =document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// 초기화 함수
const init = function() {
   scores = [0, 0];
   currentScore = 0;
   activePlayer = 0;
   playing  = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent =  0;
  current1El.textContent =  0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  current0El.textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1: 0;
  
  // toggle 메서드:해당하는 클래스가 있나 없나 확인하고 있으면 삭제하고 없으면 추가해줌

  player0El.classList.toggle('player--active'); 
  player1El.classList.toggle('player--active');
}



// Rolling dice functionality
btnRoll.addEventListener('click',function() {
  if(playing ){

    // 1. 무작위 주사위 굴리기
    const dice =Math.trunc(Math.random()* 6) + 1;
    // 2. 주사위 표시
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // 3. 1로 굴리는걸 확인 참이면 다음 플레이어로
    if(dice !== 1 ){
      // 주사위 한번더
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    }else{
      // 다음플레이어 전환
      switchPlayer();
  
    }
  }
});

btnHold.addEventListener('click',function() {
  if(playing) {

    // 현재 플레이어와 점수를 합산하기
    // 체크 점수는 >= 100
    // 게임끝
    //  다음사람으로 변경
    scores[activePlayer] +=currentScore;
    // scores[1] = scores [1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
  
    if(scores[activePlayer]>=100){
      playing = false;
      diceEl.classList.add('hidden');
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
      
    } else {
  
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click',init);