const wordInput = document.querySelector('.word-enter');
const menuDiv = document.querySelector('.menu');
const gameDiv = document.querySelector('.game');
const submissionDiv = document.querySelector('.submission');

let dict = [];
let validWords = [];

const loadDictionary = () => {
    let xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'public/assets/texts/words_alpha.txt', false);
    xhttp.send();
    dict = xhttp.responseText.split(/\r?\n/);
};

const checkWord = (word) => {
    if ((word.length > 2) && (dict.includes(word)) && (!validWords.includes(word))) {
        validWords.push(word);
        return true;
    } else {
        return false;
    }
};

const startTimer = () => {
    const currentTime = new Date().getTime();
    const minute = new Date(currentTime + 60000).getTime();
    const x = setInterval(() => {
        const now = new Date().getTime();
        const distance = minute - now;
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        document.querySelector('.timer').innerHTML = seconds;
        if (distance < 0) {
            clearInterval(x);
            document.querySelector('.timer').innerHTML = 'Game over';
            gameDiv.setAttribute('style', 'display: none');
            submissionDiv.setAttribute('style', 'display: block');
        }
    }, 1000);
};

document.querySelector('.play').addEventListener('click', () => {
    menuDiv.setAttribute('style', 'display: none');
    gameDiv.setAttribute('style', 'display: block');
    startTimer();
});

wordInput.onkeydown = (event) => {
    if (event.keyCode === 13) {
        event.preventDefault();
        let inputtedWord = document.querySelector(".user-input").value;
        wordInput.reset();
        if (checkWord(inputtedWord)) {
            console.log('yessirrr');
        }
    }
}

window.addEventListener('DOMContentLoaded', (event) => {
    loadDictionary();
});