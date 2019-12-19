const life = require('./life');

life.init(20, 20);
life.stamp(life.load('glider.cells'), life.present, 0, 0);

const table = document.getElementById('game');
for (let i = 0; i < 20; i++) {
    const row = table.appendChild(document.createElement('tr'));
    for (let j = 0; j < 20; j++) {
        const cell = row.appendChild(document.createElement('td'));
    }
}

setInterval(() => {
    console.log('stepping');
    const state = life.step();
    const rows = table.getElementsByTagName('tr');
    for (let i = 0; i < state.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        for (let j = 0; j < state[i].length; j++) {
            cells[j].innerHTML = state[i][j] === 1 ? '■' : '□';
        }
    }
}, 1000 / 10);
