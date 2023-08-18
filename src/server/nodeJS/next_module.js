// var http = require('http');
// // var dt = require('./myfirstmodule');
// // var url = require('url');

// http.createServer(function (req, res) {
//     // res.writeHead(200, { 'Content-Type': 'text/html' });
//     // res.write("The date and time are currently: " + dt.myDateTime())
//     // // var q = url.parse(req.url, true).query;
//     // // var txt = q.year + " " + q.month;
//     // res.end()
// }).listen(3000)
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
const https = require('https');

const fs = require('fs')

const hostname = '192.168.137.1';
const port = 3114;

// const server = http.createServer((req, res) => {

//     res.writeHead(200, { 'Content-Type': 'application/json' });
//     // res.statusCode = 200
//     // res.end()

// });

// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });

// https.createServer(function (req, res) {
//     res.writeHead(200);
//     res.end("hello world\n");
// }).listen(8000);

const express = require("express");
const bodyParser = require("body-parser");
const { ZingMp3 } = require("zingmp3-api-full")

const app = express();

app.use(bodyParser.json());

var url = require('url');

var mysql = require('mysql');

var cors = require('cors')

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mypassword",
    database: 'music_service'
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

// app.listen(port, () => {
//     console.log(`Server is running on http://10.0.249.109:3114/.`);
// });

const authApi = (req, res) => {
    res.send("Thank you for you accept connection. AfU Website will be worked")
}

const getSong = (req, res) => {
    const params = req.params;
    ZingMp3.getSong(params.id).then((data) => {
        res.send(data)
    })
};

const getInfoSong = (req, res) => {
    const params = req.params;
    ZingMp3.getInfoSong(params.id).then((data) => {
        res.send(data);
    })
}

const getLyrics = (req, res) => {
    const params = req.params;
    ZingMp3.getLyric(params.id).then((data) => {
        res.send(data)
    })
}

const getPlaylist = (req, res) => {
    const params = req.params;
    ZingMp3.getDetailPlaylist(params.id).then((data) => {
        res.send(data.data)
    })
}

const getTop100 = (req, res) => {
    ZingMp3.getTop100().then((data) => {
        res.send(data)
    })
}

const getHome = (req, res) => {
    ZingMp3.getHome().then((data) => {
        res.send(data)
    })
}

const getChart = (req, res) => {
    ZingMp3.getChartHome().then((data) => {
        res.send(data)
    })
}

const searchSong = (req, res) => {
    const params = req.params;
    ZingMp3.search(params.key).then((data) => {
        res.send(data);
    })
}

const getAllFavourite = (req, res) => {
    const params = req.params;

    var sql = `SELECT * FROM favourite_list WHERE userTokenId = '${params.tokenId}'`;
    con.query(sql, function (err, result) {
        res.send(result)
    })
}

const getAllUser = (req, res) => {
    var sql = 'SELECT * FROM user';
    con.query(sql, function (err, result) {
        res.send(result)
    })
}

const getInfoUser = (req, res) => {
    const params = req.params;

    var sql = `SELECT * FROM user WHERE tokenId = '${params.tokenId}'`;
    con.query(sql, function (err, result) {
        res.send(result)
    })
}

const getGame = (req, res) => {
    const params = req.params;

    var sql = `SELECT * FROM game WHERE id = ${params.id}`;
    con.query(sql, function (err, result) {
        res.send(result)
    })
}

const getAllGame = (req, res) => {
    var sql = 'SELECT * FROM game'
    con.query(sql, function (err, result) {
        res.send(result)
    })
}

const getCurrentTracks = (req, res) => {
    const params = req.params;

    var sql = `SELECT * FROM current_music WHERE user_id = '${params.id}' ORDER BY id DESC`;
    con.query(sql, function (err, result) {
        res.send(result)
    })
}

const getCurrentGame = (req, res) => {
    const params = req.params;

    var sql = `SELECT * FROM current_game WHERE userId = '${params.id}' ORDER BY id DESC`;
    con.query(sql, function (err, result) {
        res.send(result)
    })
}

const authSignin = (req, res) => {
    // var q = url.parse(req.url, true).query;

    var q = req.body;

    var token = Math.random().toString(36).slice(2, 30);

    var sqlToken = 'SELECT tokenId FROM user';
    con.query(sqlToken, function (err, result) {
        var arrToken = result;
        var arrTemp = [];
        arrToken?.map((item) => {
            arrTemp.push(item?.tokenId)
        })
        while (arrTemp?.includes(token) === true) {
            token = Math.random().toString(36).slice(2, 30);
        }

        var sqlEmail = 'SELECT email FROM user';
        con.query(sqlEmail, function (err, result) {
            var arrEmail = result;
            var arrTempEmail = [];
            arrEmail?.map((item) => {
                arrTempEmail.push(item?.email)
            })

            if (arrTemp?.includes(token) === false && arrTempEmail?.includes(q.email) === false) {
                var sql = `INSERT INTO user (name, email, tokenId, password) VALUES ( '${q.name}', '${q.email}', '${token}', '${q.password}')`;
                con.query(sql, function (err, result) {
                    res.send(err ? err : token)
                    if (err) throw err;
                    console.log("authencation");
                });
            }
            else {
                res.status(400);
                res.send('Bad Request');
            }
        })
    })
}

const authLogin = (req, res) => {
    var q = url.parse(req.url, true).query;

    // var q = req.body;
    var sql = `SELECT EXISTS(SELECT * from user WHERE email = '${q.email}' AND name = '${q.name}' AND password = '${q.password}')`
    con.query(sql, function (err, result) {
        if (result[0][Object.keys(result[0])[0]] === 0) {
            res.status(400);
            res.send('UnAuthorization')
        }
        else {
            res.status(200)
            var sqlToken = `SELECT tokenId FROM user WHERE email = '${q.email}'`;
            con.query(sqlToken, function (err, result) {
                res.send(result[0][Object.keys(result[0])[0]])
            })
        }
        if (err) throw err;

    })
}

const addFavouriteItem = (req, res) => {
    var q = req.body;

    let array = [];
    let count = 0;
    var sqlList = 'SELECT * FROM favourite_list'
    con.query(sqlList, function (err, result) {
        array = result
        array?.map((item) => {
            if (item.encodeId === q.encodeId && item.userTokenId === q.userId)
                count++;
        })

        if (count === 0) {
            var sql = `INSERT INTO favourite_list (artistsNames, encodeId, thumbnail, title, userTokenId) VALUES ('${q.artist}', '${q.encodeId}', '${q.image}', '${q.title}', '${q.userId}')`
            con.query(sql, function (err, result) {
                res.send(err ? err : result)
                console.log('1 record inserted into current')
            })
        }
        else {
            var sqlDelete = `DELETE FROM favourite_list WHERE encodeId = '${q.encodeId}' AND userTokenId = '${q.userId}'`
            con.query(sqlDelete, function (err, result) {
                console.log('1 record deleted')
                var sqlInsert = `INSERT INTO favourite_list (artistsNames, encodeId, thumbnail, title, userTokenId) VALUES ('${q.artist}', '${q.encodeId}', '${q.image}', '${q.title}', '${q.userId}')`
                con.query(sqlInsert, function (err, result) {
                    res.send(err ? err : result)
                    console.log('1 record inserted into current')
                })
            })
        }
    })
}

const removeFavouriteItem = (req, res) => {
    var q = req.body;

    var sql = `DELETE FROM favourite_list WHERE encodeId = '${q.encodeId}' AND userTokenId = '${q.userId}'`;
    con.query(sql, function (err, result) {
        res.send(err ? err : result)
        // if (err) throw err;
        console.log("1 record deleted");
    });
}

const addSongToCurrentList = (req, res) => {
    var q = req.body;

    let array = [];
    let count = 0;
    var sqlList = 'SELECT * FROM current_music'
    con.query(sqlList, function (err, result) {
        array = result
        array?.map((item) => {
            if (item.encodeId === q.encodeId && item.user_id === q.userId)
                count++;
        })

        if (count === 0) {
            var sql = `INSERT INTO current_music (title, artistsNames, thumbnail, user_id, encodeId) VALUES ('${q.title}', '${q.artist}', '${q.image}', '${q.userId}', '${q.encodeId}')`
            con.query(sql, function (err, result) {
                res.send(err ? err : result)
                console.log('1 record inserted into current')
            })
        }
        else {
            var sqlDelete = `DELETE FROM current_music WHERE encodeId = '${q.encodeId}' AND user_id = '${q.userId}'`
            con.query(sqlDelete, function (err, result) {
                console.log('1 record deleted')
                var sqlInsert = `INSERT INTO current_music (title, artistsNames, thumbnail, user_id, encodeId) VALUES ('${q.title}', '${q.artist}', '${q.image}', '${q.userId}', '${q.encodeId}')`
                con.query(sqlInsert, function (err, result) {
                    res.send(err ? err : result)
                    console.log('1 record inserted into current')
                })
            })
        }
    })
}

const addGameToCurrentList = (req, res) => {
    var q = req.body;

    let array = [];
    let count = 0;

    console.log(q)
    var sqlList = 'SELECT * FROM current_game'
    con.query(sqlList, function (err, result) {
        array = result
        array?.map((item) => {
            if (item.id === q.id && item.userId === q.userId)
                count++;
        })

        if (count === 0) {
            var sqlAdd = `INSERT INTO current_game (id, name, image, url, description, userId) VALUES ( '${q.id}', '${q.name}', '${q.image}', '${q.url}', "${q.description}", '${q.userId}')`
            console.log(sqlAdd)
            con.query(sqlAdd, function (err, result) {
                res.send(err ? err : result)
                console.log('1 record inserted into current')
            })
        }
        else {
            var sqlDelete = `DELETE FROM current_game WHERE id = '${q.id}' AND userId = '${q.userId}'`
            con.query(sqlDelete, function (err, result) {
                console.log('1 record deleted 2')
                var sqlInsert = `INSERT INTO current_game (id, name, image, url, description, userId) VALUES ('${q.id}', '${q.name}', '${q.image}', '${q.url}', "${q.description}", '${q.userId}')`
                con.query(sqlInsert, function (err, result) {
                    res.send(err ? err : result)
                    console.log('1 record inserted into current 2')
                })
            })
        }
    })
}

app.use(cors())

// GET
app.get("/api", authApi)

app.get("/api/auth/login", authLogin)

app.get("/api/get-song/:id", getSong)

app.get("/api/get-info-song/:id", getInfoSong)

app.get("/api/get-lyrics/:id", getLyrics)

app.get("/api/get-playlist/:id", getPlaylist)

app.get("/api/get-top100", getTop100)

app.get("/api/search-song/:key", searchSong)

app.get("/api/get-all-favourite/:tokenId", getAllFavourite)

app.get("/api/get-all-user", getAllUser)

app.get("/api/get-info-user/:tokenId", getInfoUser)

app.get("/api/get-game/:id", getGame)

app.get("/api/get-all-game", getAllGame)

app.get("/api/get-current-tracks/:id", getCurrentTracks)

app.get("/api/get-current-game/:id", getCurrentGame)

app.get("/api/get-home", getHome)

app.get("/api/get-chart", getChart)

// POST 
app.post("/api/auth", authSignin)

app.post("/api/add-favourite-item", addFavouriteItem)

app.post("/api/delete-favourite-item", removeFavouriteItem)

app.post("/api/add-song-currentlist", addSongToCurrentList)

app.post("/api/add-game-currentList", addGameToCurrentList)

// Creating object of key and certificate
// for SSL
const options = {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.cert"),
};

// const options = {
//     key: fs.readFileSync('key.pem'),
//     cert: fs.readFileSync('cert.pem')
// }



// Creating https server by passing
// options and app object
https.createServer(options, app)
    .listen(port, function (req, res) {
        console.log("Server started at port " + port);
    });