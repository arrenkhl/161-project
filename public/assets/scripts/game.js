const dictionary = new Set();
const wordInput = document.querySelector('.word-enter');

const validWords = new Set();

const checkWord = (word) => {
    const url = "https://api.wordnik.com/v4/word.json/" + word + "/definitions?limit=200&includeRelated=false&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";
    $.ajax({
        type: 'GET',
        url: url
    }).done(function (result) {
        if (word.length > 3) {
            console.log('true');
            return true;
        }
        return false;
    }).fail(function () {
        return false;
    });
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
        }
    }, 1000);
};

document.querySelector('.play').addEventListener('click', () => {
    console.log('play!');
});

wordInput.onkeydown = (event) => {
    if (event.keyCode === 13) {
        event.preventDefault();
        let inputtedWord = document.querySelector(".user-input").value;
        wordInput.reset();
        console.log(checkWord(inputtedWord));

    }
}

// window.addEventListener('DOMContentLoaded', (event) => {

// });