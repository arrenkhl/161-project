const loadLeaderboardData = function () {
    const url = window.location.host + '/users';
    // fetch(url)
    //     .then(response => response.json())
    //     .then(data => console.log(data));
    console.log(url);
};

const createLeaderboard = function () {

};

window.addEventListener('DOMContentLoaded', (event) => {
    loadLeaderboardData();
    createLeaderboard();
});