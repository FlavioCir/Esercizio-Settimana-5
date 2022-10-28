let arrayAnimali = ['🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐰', '🐯', '🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐯', '🐰'];
//libreria per icone
//https://html-css-js.com/html/character-codes/

document.body.onload = startGame();

let arrayComparison = [];

var interval,
    findedIcons = document.getElementsByClassName('find'),
    modal = document.querySelector('#modal'),
    timer = document.querySelector('.timer');

function shuffle(a) {
    var currentIndex = a.length;
    var temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = a[currentIndex];
        a[currentIndex] = a[randomIndex];
        a[randomIndex] = temporaryValue;
    }
    return a;
}

// una funzione che rimuove la classe active e chiama la funzione startGame()
function playAgain() {
    modal.classList.remove('active');
    startGame();
}

function startGame() {

    clearInterval(interval); //reset timer

    let arrayShuffle = shuffle(arrayAnimali),
        grid = document.querySelector('#griglia');

    while (grid.hasChildNodes()) {
        grid.removeChild(grid.firstChild);
    };

    arrayShuffle.forEach(e => {
        let box = document.createElement('div'),
            card = document.createElement('div');
            
        card.className = 'icon';
        grid.appendChild(box).appendChild(card);
        card.innerHTML = e;
    });

    setTimer();

    let icon = document.getElementsByClassName("icon"),
        icons = [...icon];

    icons.forEach(i => {
        i.addEventListener("click", displayIcon);
        i.addEventListener("click", displayModal);
    });

    function displayIcon() { //
    
        //mette/toglie la classe show
        if (this.classList.contains("show")) {
            this.classList.remove("show");
        } else {
            this.classList.add("show");
        }
        //aggiunge l'oggetto su cui ha cliccato all'array del confronto
        arrayComparison.push(this);
    
        var len = arrayComparison.length;
        //se nel confronto ci sono due elementi
        if (len === 2) {
            //se sono uguali aggiunge la classe find
            if (arrayComparison[0].innerHTML === arrayComparison[1].innerHTML) {
                arrayComparison[0].classList.add("find", "disabled");
                arrayComparison[1].classList.add("find", "disabled");
                arrayComparison = [];
            } else {
                //altrimenti (ha sbagliato) aggiunge solo la classe disabled
                icons.forEach(item => {
                    item.classList.add('disabled');
                });
                // con il timeout rimuove  la classe show per nasconderli
                setTimeout(() => {
                    arrayComparison[0].classList.remove("show");
                    arrayComparison[1].classList.remove("show");
                    icons.forEach(function(item) {
                        item.classList.remove('disabled');
                        for (let i = 0; i < findedIcons.length; i++) {
                            findedIcons[i].classList.add("disabled");
                        }
                    });
                    arrayComparison = [];
                }, 700);
            }
        }
    }
};

//una funzione che viene mostrata alla fine quando sono tutte le risposte esatte
function displayModal() {
    if (findedIcons.length == 24) {
        document.getElementById("tempoTrascorso").innerHTML = timer.innerHTML;
        clearInterval(interval);
        modal.classList.add('active');
        hideModal();
    }
};

// una funzione che calcola il tempo e aggiorna il contenitore sotto
function setTimer() {
    let secondi = 0;
    let minuti = 0;

    interval = setInterval(() => {
        timer.innerHTML = `Tempo: ${minuti} minuti ${secondi} secondi`;
        secondi++;
        if (secondi == 60) {
            minuti++;
            secondi = 0;
        }
    }, 1000);
}
