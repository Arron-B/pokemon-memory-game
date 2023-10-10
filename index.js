const cards = document.querySelectorAll('.card');
const img1 = document.getElementById('img1');
const images = document.querySelectorAll('img');
const winModal = document.getElementById('you-win');
const playAgain = document.getElementById('play-again');


let cardOrder = shuffle()
let clickCount = 0;
let score = 0;
let previousCardInd;
let clickedCardInd = []

function shuffle() {
    let imgNums = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8]
    let currentIndex = imgNums.length,  randomIndex;
  
    while (currentIndex > 0) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [imgNums[currentIndex], imgNums[randomIndex]] = [
        imgNums[randomIndex], imgNums[currentIndex]];
    }
    return imgNums;
  }

function resetGame() {
    cardOrder = shuffle();
    score = 0;
    clickCount = 0;
    cards.forEach((card, i) => {
    cards[i].classList.toggle('hidden-div')
    images[i].classList.toggle('hidden-image')
    cards[i].firstElementChild.src = `./images/${cardOrder[i]}.png`
    })
}





cards.forEach((image, i) => {
    cards[i].firstElementChild.src = `./images/${cardOrder[i]}.png`
    cards[i].addEventListener('click', () => {
        if (cards[i].classList.contains('hidden-div')) {
        if (clickCount === 0) { // 1st card clicked
        cards[i].classList.toggle('hidden-div')
        images[i].classList.toggle('hidden-image')
        clickCount++
        previousCardInd = i;
        }
        else if (clickCount === 1) { // 2nd card clicked
            cards[i].classList.toggle('hidden-div')
            images[i].classList.toggle('hidden-image')
            

            if (cards[i].firstElementChild.src === cards[previousCardInd].firstElementChild.src) {
                console.log('MATCH!');
                score++;
                clickCount = 0
                if(score === 8) {winModal.showModal()}; // Win condition
            }
            else {
            clickCount++
        setTimeout(() => {
            cards[i].classList.toggle('hidden-div')
            images[i].classList.toggle('hidden-image')
            cards[previousCardInd].classList.toggle('hidden-div')
            images[previousCardInd].classList.toggle('hidden-image')
            clickCount = 0
        }, 2000)
             }
        }
    }
    })
})

playAgain.addEventListener('click' , () => {
    resetGame();
    winModal.close();
})