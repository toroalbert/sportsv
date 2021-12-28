const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http, { cors: { origin: '*' } });
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('ready');
});

// app.get('/server', (req, res) => {
//     res.sendFile(__dirname + '/variables.html');
// });

var score_visit = 0;
var foult_visit = 0;
var score_home = 0;
var foult_home = 0;
var gametime = '10:00';
var time = '1C';
var visita = "Cocodrilos.png";
var home = "Spartans.png";
var hidden_score = 0;
var message = {}
var stats = {}
var players = {}
message.up = "";
message.down = "";
serie_v = 0;
serie_c = 0;

stats.title = "Descanso";
stats.TC_right_i = stats.TC_left_i = 0;
stats.TC_right_r = stats.TC_left_r = 0;

stats.C2_right_i = stats.C2_left_i = 0;
stats.C2_right_r = stats.C2_left_r = 0;

stats.C3_right_i = stats.C3_left_i = 0;
stats.C3_right_r = stats.C3_left_r = 0;

stats.TL_right_i = stats.TL_left_i = 0;
stats.TL_right_r = stats.TL_left_r = 0;

stats.REB_right = stats.REB_left = 0;

stats.AS_right = stats.AS_left = 0;

stats.ST_right = stats.ST_left = 0;

stats.BLQ_right = stats.BLQ_left = 0;

stats.PER_right = stats.PER_left = 0;


players.PTS_player_left = players.PTS_player_right = "";
players.PTS_player_left_P = players.PTS_player_right_P = 0;

players.REB_player_left = players.REB_player_right = "";
players.REB_player_left_P = players.REB_player_right_P = 0;

players.AS_player_left = players.AS_player_right = "";
players.AS_player_left_P = players.AS_player_right_P = 0;

players.ROB_player_left = players.ROB_player_right = "";
players.ROB_player_left_P = players.ROB_player_right_P = 0;

players.BLQ_player_left = players.BLQ_player_right = "";
players.BLQ_player_left_P = players.BLQ_player_right_P = 0;

var players_c = players;
var color_left = color_right = "#fff";

io.on('connection', (socket) => {
    var score = [
        { name: 'score_visit', value: score_visit },
        { name: 'foult_visit', value: foult_visit },
        { name: 'score_home', value: score_home },
        { name: 'foult_home', value: foult_home },
        { name: 'time', value: time }
    ]



    io.emit('score', score);
    io.emit('game-time', gametime);
    // io.emit('score_visit', score_visit);
    // io.emit('foult_visit', foult_visit);
    // io.emit('score_home', score_home);
    // io.emit('foult_home', foult_home);
    // io.emit('time', time);
    io.emit('serie_v', serie_v);
    io.emit('serie_c', serie_c);
    io.emit('img_visit', visita);
    io.emit('img_home', home);
    io.emit('stats', stats);
    io.emit('players', players);
    io.emit('hidden_score', hidden_score);
    io.emit('message', message);

    io.emit('color_right', color_right);
    io.emit('color_left', color_left);

    socket.on('stats', data => {
        stats = data;
        io.emit('stats', stats);
    });

    socket.on('players', data => {
        players = data;
        io.emit('players', players);
    });

    socket.on('players_c', data => {
        players = players_c;
        io.emit('players', players);
    });

    socket.on('score', data => {
        // console.log(data);
        score = data;
        io.emit('score', data);
    });

    socket.on('game-time', data => {
        gametime = data;
        io.emit('game-time', data);
    });

    socket.on('score_visit', data => {
        score_visit = data;
        io.emit('score_visit', data);
    });

    socket.on('foult_visit', data => {
        foult_visit = data;
        io.emit('foult_visit', data);
    });

    socket.on('score_home', data => {
        score_home = data;
        io.emit('score_home', data);
    });

    socket.on('foult_home', data => {
        foult_home = data;
        io.emit('foult_home', data);
    });

    socket.on('time', data => {
        time = data;
        io.emit('time', data);
    });

    socket.on('color_right', color => {
        color_right = color;
        io.emit('color_right', color);
    });

    socket.on('color_left', color => {
        color_left = color;
        io.emit('color_left', color);
    });

    socket.on('img_visit', img => {
        visita = img;
        io.emit('img_visit', img);
    });

    socket.on('img_home', img => {
        home = img;
        io.emit('img_home', img);
    });

    socket.on('hidden_score', val => {
        hidden_score = val;
        io.emit('hidden_score', val);
    });

    socket.on('message', val => {
        message = val;
        io.emit('message', val);
    });

    socket.on('serie_v', val => {
        serie_v = val;
        io.emit('serie_v', val);
    });

    socket.on('serie_c', val => {
        serie_c = val;
        io.emit('serie_c', val);
    });

    socket.on('stat-show-tony', val => {
        io.emit('stat-show-tony', val);
    });

    socket.on('stat-show-porcent', val => {
        io.emit('stat-show-porcent', val);
    });

    socket.on('stat-show-total', val => {
        io.emit('stat-show-total', val);
    });

    socket.on('stat-show-players', val => {
        io.emit('stat-show-players', val);
    });
});

http.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
});