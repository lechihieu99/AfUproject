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
// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
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
    password: "yourpassword",
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

const getAvatar = (req, res) => {
    const params = req.params;

    var sql = `SELECT avatar FROM user WHERE tokenId = '${params.id}'`
    con.query(sql, function (err, result) {
        res.send(result)
    })
}

const getUserStatus = (req, res) => {
    const params = req.params;

    var sql = `SELECT * FROM status WHERE userId = "${params.id}" ORDER BY id DESC`
    con.query(sql, function (err, result) {
        res.send(err ? err : result)
    })
}

const getUserLikeList = (req, res) => {
    const params = req.params;

    var sql = `SELECT * FROM like_list WHERE userId = "${params.id}"`
    con.query(sql, function (err, result) {
        res.send(err ? err : result)
    })
}

const getAllStatus = (req, res) => {
    var sql = 'SELECT S.id, S.userId, S.likeNumber, S.comment, S.star, S.share, S.content, S.image, S.imageContent, S.type, S.link, U.name, U.avatar FROM status as S inner join user as U on S.userId = U.tokenId ORDER BY S.id DESC'
    con.query(sql, function (err, result) {
        res.send(err ? err : result)
    })
}

const getAllCommentStatus = (req, res) => {
    const params = req.params;
    var sql = `SELECT C.id, C.linkStatus, C.ownerId, C.userComment, C.commentId, C.content, C.likeNumber, U.name, U.avatar FROM comment as C inner join user as U on C.userComment = U.tokenId WHERE C.linkStatus = "${params.id}"`
    con.query(sql, function (err, result) {
        res.send(err ? err : result)
    })
}

const getAllCommentLikeList = (req, res) => {
    const params = req.params;

    var sql = `SELECT * FROM likecomment WHERE linkStatus = "${params.id}"`
    con.query(sql, function (err, result) {
        res.send(err ? err : result)
    })
}

const getAllStarListByUser = (req, res) => {
    const params = req.params;

    var sql = `SELECT S.linkStatus, S.ownerId, U.name, U.tokenId, U.avatar, Stt.likeNumber, Stt.userId, Stt.comment, Stt.star, Stt.share, Stt.content, Stt.image, Stt.imageContent, Stt.type, Stt.link FROM (star_list as S inner join user as U on S.tokenId = U.tokenId) inner join status as Stt on S.linkStatus = Stt.link WHERE S.tokenId = '${params.id}'`
    con.query(sql, function (err, result) {
        res.send(err ? err : result)
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

var fileupload = require("express-fileupload");
app.use(fileupload());
app.use(express.urlencoded({ extended: true }));

const updateAvatar = (req, res) => {
    const params = req.params;
    try {
        fs.writeFileSync(`./image/avatar/${params.id}_${req.files.file.name}`, req.files.file.data)
        console.log('image has been uploaded')
        var sql = `UPDATE user SET avatar="https://192.168.137.1:3114/image/avatar/${params.id}_${req.files.file.name}" WHERE tokenId = "${params.id}"`
        con.query(sql, function (err, result) {
            res.send(err ? err : result)
            console.log('1 record iupdated')
        })
    } catch (error) {
        console.log(error)
    }
}

const updateUser = (req, res) => {
    var q = req.body;
    const params = req.params;
    sql = `UPDATE user SET name="${q.name}", email="${q.email}", birthday="${q.birthday}", sex="${q.sex}", education="${q.education}", habit="${q.habit}" WHERE tokenId = "${params.id}"`
    con.query(sql, function (err, result) {
        res.send(err ? err : result)
        console.log('1 user has been updated')
    })
}

const postImage = (req, res) => {
    const params = req.params;
    try {
        fs.writeFileSync(`./image/other/${params.id}_${decodeURI(req.files.file.name)}`, req.files.file.data)
        console.log('other image has been uploaded')
        res.status(200)
        res.send('OK')
        // var sql = `UPDATE status SET image="https://192.168.137.1:3114/image/other/${params.id}_${req.files.file.name}" WHERE linkNumber = "${params.link}"`
        // con.query(sql, function (err, result) {
        //     res.send(err ? err : result)
        //     console.log('1 record iupdated')
        // })
    } catch (error) {
        console.log(error)
    }
}

const postStatus = (req, res) => {
    var q = req.body;

    var link = Math.random().toString(36).slice(2, 30);

    var sqlLink = 'SELECT link FROM status';
    con.query(sqlLink, function (err, result) {
        var arrToken = result;
        var arrTemp = [];
        arrToken?.map((item) => {
            arrTemp.push(item?.link)
        })
        while (arrTemp?.includes(link) === true) {
            link = Math.random().toString(36).slice(2, 30);
        }
        sql = `INSERT INTO status (userId, likeNumber, comment, star, share, content, image, imageContent, type, link) VALUES ("${q.tokenId}", "${q.like}", "${q.comment}", "${q.star}", "${q.share}", "${q.content}", "${q.image}", "${q.imageContent}", "${q.type}", "${link}")`
        con.query(sql, function (err, result) {
            res.send(err ? err : result)
        })
    })
}

const removeStatus = (req, res) => {
    var q = req.body;

    var sql = `DELETE FROM status WHERE link = "${q.link}"`
    con.query(sql, function (err, result) {
        console.log('1 status has been removed')
        res.send(err ? err : result)
    })
}

const addLikeNumberStatus = (req, res) => {
    var q = req.body;
    var sql = `SELECT likeNumber FROM status WHERE link = "${q.link}"`
    con.query(sql, function (err, result) {
        var newLike = result[0].likeNumber + 1;
        var sqlUpdate = `UPDATE status SET likeNumber="${newLike}" WHERE link = "${q.link}"`
        con.query(sqlUpdate, function (err2, result2) {
            console.log('1 user liked status')
            var sqlLikeList = `INSERT INTO like_list (linkStatus, userId) VALUES ("${q.link}", "${q.tokenId}")`
            con.query(sqlLikeList, function (err3, result3) {
                console.log('1 user was be added into like list')
                res.send(err3 ? err3 : result3)
            })

        })
    })
}

const removeLikeStatus = (req, res) => {
    var q = req.body;
    var sql = `SELECT likeNumber FROM status WHERE link = "${q.link}"`
    con.query(sql, function (err, result) {
        var newLike = result[0].likeNumber - 1;
        var sqlUpdate = `UPDATE status SET likeNumber="${newLike}" WHERE link = "${q.link}"`
        con.query(sqlUpdate, function (err2, result2) {
            console.log('1 user unliked status')
            var sqlLikeList = `DELETE FROM like_list WHERE linkStatus = "${q.link}" AND userId = "${q.tokenId}"`
            con.query(sqlLikeList, function (err3, result3) {
                console.log('1 user was be removed into like list')
                res.send(err3 ? err3 : result3)
            })

        })
    })
}

const isExistInLikeList = (req, res) => {
    var q = req.body;
    let array = [];
    let count = 0;
    var sqlList = 'SELECT * FROM like_list'
    con.query(sqlList, function (err, result) {
        array = result
        array?.map((item) => {
            if (item.linkStatus === q.link && item.userId === q.tokenId)
                count++;
        })

        if (count === 0) {
            console.log(`user ${q.tokenId} is not exist in status ${q.link}`)
            res.send('none')
        }
        else {
            console.log(`user ${q.tokenId} is not exist in status ${q.link}`)
            res.send('exist')

        }
    })
}

const postComment = (req, res) => {
    var q = req.body;
    var sql = `SELECT comment FROM status WHERE link = "${q.link}"`

    var cmtId = Math.random().toString(36).slice(2, 30);

    var sqlCmtId = 'SELECT commentId FROM comment';
    con.query(sqlCmtId, function (err, result) {
        var arrToken = result;
        var arrTemp = [];
        arrToken?.map((item) => {
            arrTemp.push(item?.commentId)
        })
        while (arrTemp?.includes(cmtId) === true) {
            cmtId = Math.random().toString(36).slice(2, 30);
        }
        con.query(sql, function (err, result) {
            var newComment = result[0].comment + 1;
            var sqlUpdate = `UPDATE status SET comment="${newComment}" WHERE link = "${q.link}"`
            con.query(sqlUpdate, function (err2, result2) {
                console.log('1 user was comment status')
                var sqlCommentList = `INSERT INTO comment (linkStatus, ownerId, userComment, commentId, content, likeNumber) VALUES ("${q.link}", "${q.ownerId}", "${q.userComment}", "${cmtId}", "${q.content}", "0")`
                con.query(sqlCommentList, function (err3, result3) {
                    console.log('1 user was be added into comment list')
                    res.send(err3 ? err3 : result3)
                })

            })
        })
    })
}

const removeComment = (req, res) => {
    var q = req.body;
    var sql = `SELECT comment FROM status WHERE link = "${q.link}"`
    con.query(sql, function (err, result) {
        var newComment = result[0].comment - 1;
        var sqlUpdate = `UPDATE status SET comment="${newComment}" WHERE link = "${q.link}"`
        con.query(sqlUpdate, function (err2, result2) {
            console.log('1 user removed comment status')
            var sqlCommentList = `DELETE FROM comment WHERE linkStatus = "${q.link}" AND userComment = "${q.tokenId}"`
            con.query(sqlCommentList, function (err3, result3) {
                console.log('1 user was be removed into comment list')
                res.send(err3 ? err3 : result3)
            })

        })
    })
}

const likeComment = (req, res) => {
    var q = req.body;
    console.log(q)
    var sql = `SELECT likeNumber FROM comment WHERE linkStatus = "${q.link}" AND commentId = "${q.commentId}"`
    con.query(sql, function (err, result) {
        var newLike = result[0].likeNumber + 1;
        var sqlUpdate = `UPDATE comment SET likeNumber="${newLike}" WHERE linkStatus = "${q.link}" AND commentId = "${q.commentId}"`
        con.query(sqlUpdate, function (err2, result2) {
            console.log('1 user liked comment')
            var sqlLikeList = `INSERT INTO likecomment (commentId, ownerComment, userLike, linkStatus) VALUES ("${q.commentId}", "${q.owner}", "${q.userLike}", "${q.link}")`
            con.query(sqlLikeList, function (err3, result3) {
                console.log('1 user was be added into like comment list')
                res.send(err3 ? err3 : result3)
            })

        })
    })
}

const removeLikeComment = (req, res) => {
    var q = req.body;
    var sql = `SELECT likeNumber FROM comment WHERE linkStatus = "${q.link}" AND commentId = "${q.commentId}"`
    con.query(sql, function (err, result) {
        var newLike = result[0].likeNumber - 1;
        var sqlUpdate = `UPDATE comment SET likeNumber="${newLike}" WHERE linkStatus = "${q.link}" AND commentId = "${q.commentId}"`
        con.query(sqlUpdate, function (err2, result2) {
            console.log('1 user unliked comment')
            var sqlLikeList = `DELETE FROM likecomment WHERE commentId = "${q.commentId}" AND userLike = "${q.userLike}"`
            con.query(sqlLikeList, function (err3, result3) {
                console.log('1 user was be removed into like comment list')
                res.send(err3 ? err3 : result3)
            })

        })
    })
}

const addStarList = (req, res) => {
    var q = req.body;

    var sql = `SELECT star FROM status WHERE link = "${q.link}"`
    con.query(sql, function (err, result) {
        var newLike = result[0].star + 1;
        var sqlUpdate = `UPDATE status SET star="${newLike}" WHERE link = "${q.link}"`
        con.query(sqlUpdate, function (err2, result2) {
            console.log('1 user star status')
            var sqlLikeList = `INSERT INTO star_list (linkStatus, ownerId, tokenId) VALUES ('${q.link}', '${q.ownerId}', '${q.tokenId}')`
            con.query(sqlLikeList, function (err3, result3) {
                console.log('1 item was be added into star list')
                res.send(err3 ? err3 : result3)
            })

        })
    })

    // let array = [];
    // let count = 0;
    // var sqlList = 'SELECT * FROM star_list'
    // con.query(sqlList, function (err, result) {
    //     array = result
    //     array?.map((item) => {
    //         if (item.linkStatus === q.link && item.tokenId === q.tokenId)
    //             count++;
    //     })

    //     if (count === 0) {
    //         var sql = `INSERT INTO star_list (linkStatus, ownerId, tokenId) VALUES ('${q.link}', '${q.ownerId}', '${q.tokenId}'`
    //         con.query(sql, function (err, result) {
    //             res.send(err ? err : result)
    //             console.log('1 record inserted into star list')
    //         })
    //     }
    //     else {
    //         var sqlDelete = `DELETE FROM star_list WHERE linkStatus = '${q.link}' AND tokenId = '${q.tokenId}'`
    //         con.query(sqlDelete, function (err, result) {
    //             console.log('1 record deleted')
    //             var sqlInsert = `INSERT INTO star_list (linkStatus, ownerId, tokenId) VALUES ('${q.link}', '${q.ownerId}', '${q.tokenId}'`
    //             con.query(sqlInsert, function (err, result) {
    //                 res.send(err ? err : result)
    //                 console.log('1 record inserted into star list')
    //             })
    //         })
    //     }
    // })
}

const removeStarList = (req, res) => {
    var q = req.body;

    var sql = `SELECT star FROM status WHERE link = "${q.link}"`
    con.query(sql, function (err, result) {
        var newLike = result[0].star - 1;
        var sqlUpdate = `UPDATE status SET star="${newLike}" WHERE link = "${q.link}"`
        con.query(sqlUpdate, function (err2, result2) {
            console.log('1 user remove star status')
            var sqlLikeList = `DELETE FROM star_list WHERE linkStatus = "${q.link}" AND tokenId = "${q.tokenId}"`
            con.query(sqlLikeList, function (err3, result3) {
                console.log('1 item was be removed into star list')
                res.send(err3 ? err3 : result3)
            })

        })
    })
    // var sql = `DELETE FROM star_list WHERE linkStatus = '${q.link}' AND tokenId = '${q.tokenId}'`;
    // con.query(sql, function (err, result) {
    //     res.send(err ? err : result)
    //     // if (err) throw err;
    //     console.log("1 record deleted");
    // });
}

app.use(express.static('public'));
app.use('/image', express.static('image'));
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

app.get("/api/get-avatar/:id", getAvatar)

app.get("/api/get-user-status/:id", getUserStatus)

app.get("/api/get-like-list/:id", getUserLikeList)

app.get("/api/get-all-status", getAllStatus)

app.get("/api/get-all-comment/:id", getAllCommentStatus)

app.get("/api/get-all-comment-like-list/:id", getAllCommentLikeList)

app.get("/api/get-star-list/:id", getAllStarListByUser)

// POST 
app.post("/api/auth", authSignin)

app.post("/api/add-favourite-item", addFavouriteItem)

app.post("/api/delete-favourite-item", removeFavouriteItem)

app.post("/api/add-song-currentlist", addSongToCurrentList)

app.post("/api/add-game-currentList", addGameToCurrentList)

app.post("/api/upload-avatar/:id", updateAvatar)

app.post("/api/update-information/:id", updateUser)

app.post("/api/post-status", postStatus)

app.post("/api/remove-status", removeStatus)

app.post("/api/upload-image/:id", postImage)

app.post("/api/add-like-status", addLikeNumberStatus)

app.post("/api/remove-like-status", removeLikeStatus)

app.post("/api/is-exist-status", isExistInLikeList)

app.post("/api/post-comment", postComment)

app.post("/api/remove-comment", removeComment)

app.post("/api/like-comment", likeComment)

app.post("/api/remove-like-comment", removeLikeComment)

app.post("/api/add-star-item", addStarList)

app.post("/api/remove-star-item", removeStarList)

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