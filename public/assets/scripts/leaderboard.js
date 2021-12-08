const loadLeaderboard = () => {
    const url = window.location.protocol + '//' + window.location.host + '/users';
    const lb = document.getElementById('leaderboard');
    fetch(url)
        .then(response => response.json())
        .then(data => {
            users = [];
            data.users.users.forEach((user) => {
                users.push(user);
            });
            users.sort((a, b) => {
                return a.highscore < b.highscore;
            });
            users.forEach((user, i) => {
                if (i < 10) {
                    let row = lb.insertRow(i + 1);
                    let cell0 = row.insertCell(0);
                    let cell1 = row.insertCell(1);
                    let cell2 = row.insertCell(2);
                    cell0.innerHTML = i + 1;
                    cell1.innerHTML = user.username;
                    cell2.innerHTML = user.highscore;
                }
            });
        });
};

window.addEventListener('DOMContentLoaded', (event) => {
    loadLeaderboard();
});