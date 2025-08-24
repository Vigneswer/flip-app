const box1 = document.getElementById("box1");
    const box2 = document.getElementById("box2");
    const box3 = document.getElementById("box3");
    const box4 = document.getElementById("box4");
    const box5 = document.getElementById("box5");

    window.addEventListener("scroll", () => {
      let scrollY = window.scrollY;


      let move1 = Math.max(0, 100 - scrollY * 0.4);

      let move2 = Math.max(0, 100 - scrollY * 0.6);
      let move3 = Math.max(0, 100 - scrollY * 0.3);
      let move4 = Math.max(0, 100 - scrollY * 0.5);
      let move5 = Math.max(0, 100 - scrollY * 0.7);


      box1.style.transform = `translateY(${move1}vh)`;

      box2.style.transform = `translateY(${move2}vh)`;
      box3.style.transform = `translateY(${move3}vh)`;
      box4.style.transform = `translateY(${move4}vh)`;
      box5.style.transform = `translateY(${move5}vh)`;
    });


let cardData = [
    { id: 1, img: "https://images.unsplash.com/photo-1709798461914-a9576fffd582?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cG9yc2hlJTIwOTExfGVufDB8fDB8fHww" },
    { id: 1, img: "https://images.unsplash.com/photo-1709798461914-a9576fffd582?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cG9yc2hlJTIwOTExfGVufDB8fDB8fHww" },
    { id: 2, img: "https://images.unsplash.com/photo-1634673970798-a15ae56f6c65?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 2, img: "https://images.unsplash.com/photo-1634673970798-a15ae56f6c65?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 3, img: "https://images.unsplash.com/photo-1701806190163-d0bcfdbe6175?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHBvcnNoZSUyMDkxMXxlbnwwfHwwfHx8MA%3D%3D" },
    { id: 3, img: "https://images.unsplash.com/photo-1701806190163-d0bcfdbe6175?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHBvcnNoZSUyMDkxMXxlbnwwfHwwfHx8MA%3D%3D" },
    { id: 4, img: "https://images.unsplash.com/photo-1743356970501-3127ca54d343?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 4, img: "https://images.unsplash.com/photo-1743356970501-3127ca54d343?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const shuffledCards = shuffle(cardData);
const gameBoard = document.getElementById("gameBoard");


shuffledCards.forEach(item => {
  gameBoard.innerHTML += `
    <div class="col-3 ">
      <div class="card-inner position-relative w-100 ">
        <div class="card-front w-100 h-100 position-absolute">
          <img class="img-fluid" src="https://images.unsplash.com/photo-1592058088665-6c9b45a82024?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="">
        </div>
        <div class="card-back w-100 h-100 position-absolute">
          <img src="${item.img}" alt="">
        </div>
      </div>
    </div>`;
});

// flip
// document.querySelectorAll('.card-inner').forEach(card => {
//   card.addEventListener('click', () => {
//     card.classList.toggle('flipped');
//   });
// });


let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;            
let matches = 0;          
const totalPairs = cardData.length / 2;

const scoreEl = document.getElementById('score');
const restartBtn = document.getElementById('restartBtn');

function updateScore() {
    scoreEl.textContent = `Moves: ${moves}`;
}

function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function restartGame() {
    moves = 0;
    matches = 0;
    updateScore();
    document.getElementById("winMessage").innerHTML = "";
    gameBoard.innerHTML = '';
    shuffle(cardData).forEach(item => {
        gameBoard.innerHTML += `
        <div data-aos="zoom-in-up" 
    data-aos-duration="800" class="col-3">
            <div class="card-inner position-relative w-100" style="height:30vh">
                <div class="card-front w-100 h-100 position-absolute">
                    <img class="img-fluid" src="https://images.unsplash.com/photo-1592058088665-6c9b45a82024?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="">
                </div>
                <div class="card-back w-100 h-100 position-absolute">
                    <img src="${item.img}" alt="">
                </div>
            </div>
        </div>`;
    });
    attachCardListeners();
}

function attachCardListeners() {
    document.querySelectorAll('.card-inner').forEach(card => {
        card.addEventListener('click', () => {
            if (lockBoard || card.classList.contains('flipped')) return;

            card.classList.add('flipped');

            if (!firstCard) {
                firstCard = card;
                return;
            }

            secondCard = card;
            moves++;
            updateScore();
            lockBoard = true;

            let firstId = firstCard.querySelector('.card-back img').src;
            let secondId = secondCard.querySelector('.card-back img').src;

            if (firstId === secondId) {
    matches++;
    setTimeout(() => {
        resetBoard();
        if (matches === totalPairs) {
             document.getElementById("winMessage").innerHTML =
        ` Congratulations! You completed the game in ${moves} moves.`;
        }
    }, 500); 
} else {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}
        });
    });
}

restartBtn.addEventListener('click', restartGame);

restartGame();


