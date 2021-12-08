const wordInput = document.querySelector('.word-enter');
const menuDiv = document.querySelector('.menu');
const gameDiv = document.querySelector('.game');
const submissionDiv = document.querySelector('.submission');

let dict = [];
let words = [];
let validWords = [];
let generatedWord = "";
let score = 0;

const loadDictionary = () => {
    let xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'public/assets/texts/words_alpha.txt', false);
    xhttp.send();
    dict = xhttp.responseText.split(/\r?\n/);

    xhttp.open('GET', 'public/assets/texts/common_words.txt', false);
    xhttp.send();
    words = xhttp.responseText.split(/\r?\n/);
};

const generateWord = () => {
    generatedWord = words[Math.floor(Math.random() * words.length)];
    document.querySelector('.generate-word').innerHTML = generatedWord.toUpperCase();
};

const checkWord = (word) => {
    for (let i = 0; i < word.length; i++) {
        if (!generatedWord.includes(word.charAt(i))) {
            return false;
        }
    }

    if ((word.length > 2) && (dict.includes(word)) && (!validWords.includes(word)) && (word != generatedWord)) {
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
            gameDiv.setAttribute('style', 'display: none');
            submissionDiv.setAttribute('style', 'display: block');
            document.querySelector("input[name='username']").removeAttribute('disabled');
            document.querySelector('.username-form').reset();
            document.querySelector('.score-text').innerHTML = score;
            document.querySelector('.score').innerHTML = 0;
            document.querySelector('.timer').innerHTML = 59;
        }
    }, 1000);
};

document.querySelector('.play').addEventListener('click', () => {
    menuDiv.setAttribute('style', 'display: none');
    gameDiv.setAttribute('style', 'display: block');
    document.querySelector("input[name='username']").removeAttribute('disabled');
    document.querySelector("input[name='username-submit']").removeAttribute('disabled');
    document.querySelector("input[name='username-submit']").setAttribute('value', 'Submit score');
    wordInput.reset();
    generateWord();
    startTimer();
});

document.querySelector('.play-again').addEventListener('click', () => {
    validWords = [];
    score = 0;
    document.querySelector('.score-text').innerHTML = 0;
    submissionDiv.setAttribute('style', 'display: none');
    gameDiv.setAttribute('style', 'display: none');
    menuDiv.setAttribute('style', 'display: block');
});

document.querySelector('.username-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const usernameInput = document.querySelector("input[name='username']").value;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/user');
    let data = `{
        "username": "${usernameInput}",
        "highscore": ${score}
    }`;
    xhr.send(data);
    document.querySelector("input[name='username']").setAttribute('disabled', '');
    document.querySelector("input[name='username-submit']").setAttribute('disabled', '');
    document.querySelector("input[name='username-submit']").setAttribute('value', 'Submitted');
})

wordInput.onkeydown = (event) => {
    if (event.keyCode === 13) {
        event.preventDefault();
        let inputtedWord = document.querySelector(".user-input").value.toLowerCase();
        wordInput.reset();
        if (checkWord(inputtedWord)) {
            score += inputtedWord.length;
            document.querySelector('.score').innerHTML = score;
        }
    }
}

window.addEventListener('DOMContentLoaded', (event) => {
    loadDictionary();
});