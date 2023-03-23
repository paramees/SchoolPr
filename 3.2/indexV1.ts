import express, { NextFunction } from 'express';
import { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import * as fs from 'node:fs';
import * as mysql from 'mysql';
const fileUpload = require('express-fileupload');
const path = require('path');


const user = "Basic " + Buffer.from("admin:admin").toString('base64');
const app = express();
const PORT = 3000;

interface bdData {
    id: number,
    name: string,
    author: string
    year: number,
    pages: number,
    description: string,
    visiters: number,
    wanted: number
}

const connectoin = mysql.createConnection({
    host: 'localhost',
    user: 'sqluser',
    password: 'password',
    database: 'bookstore'
});
connectoin.connect((err) => {
    if (err) {
        console.log("DB err: " + err)
    } else {
        console.log("Connecret to DB");
        app.listen(PORT, () => { console.log(`Running on PORT ${PORT}`) });
    }
});


//app.use(bodyParser.json());
app.use(express.static(__dirname.replace("dist", "public")));



app.get("/", (req, res) => {
    fs.readFile(__dirname.replace("dist", "src") + "/books-page.html", "utf-8", (err, page) => {
        if (err) { console.log(err) } else {
            let query = "SELECT * from basic_table";
            connectoin.query(query, (err: string | null, data: bdData[]) => {
                //console.log(data)
                if (err || data.length == 0) {
                    console.log("bad querry" + err);
                    res.sendStatus(500);
                } else {
                    let booksHTML = "";
                    let start = 0;
                    let pageCur = 1;
                    if (req.query.offset) {
                        start = Number(req.query.offset) - 10;
                        pageCur = Number(req.query.offset) / 10;
                    }

                    data.slice(start, start + 10).forEach((book) => {
                        booksHTML += `
                        <div data-book-id="${book.id}" class="book_item col-xs-6 col-sm-3 col-md-2 col-lg-2">
                            <div class="book">
                                <a href="http://localhost:3000/book/${book.id}">
                                    <img src="./books-page_files/${book.id}.jpg" alt="${book.name}">
                                    <div data-title="${book.name}" class="blockI" style="height: 46px;">
                                        <div data-book-title="${book.name}" class="title size_text">${book.name}</div>
                                        <div data-book-author="${book.author}" class="author">${book.author}</div>
                                    </div>
                                </a>
                                <a href="http://localhost:3000/book/${book.id}">
                                    <button type="button" class="details btn btn-success">Читать</button>
                                </a>
                            </div>
                        </div>
                        `
                    });
                    let html = page
                        .replace(/___Books___/g, booksHTML)
                        .replace(/"___curPAGE___"/g, pageCur + "")
                        .replace(/"___maxPAGE___"/g, Math.ceil(data.length / 10) + "");
                    res.send(html);
                }
            })
        }
    });
});

app.get("/book/:id", bodyParser.json(), (req, res) => {
    fs.readFile(__dirname.replace("dist", "src") + "/book-page.html", "utf-8", (err, page) => {
        if (err) { console.log(err) } else {
            let query = "SELECT * from basic_table WHERE id = " + req.params.id;
            connectoin.query(query, (err, data) => {
                //console.log(data)
                if (err || data.length == 0) {
                    console.log("bad querry" + err);
                    res.sendStatus(500);
                } else {
                    let book: bdData = data[0];
                    let html = page
                        .replace(/__id__/g, req.params.id)
                        .replace(/__name__/g, book.name)
                        .replace(/__author__/g, book.author)
                        .replace(/__year__/g, book.year + "")
                        .replace(/__pages__/g, book.pages + "")
                        .replace(/__descr__/g, book.description);
                    res.send(html);
                }
            })
        }
    });
});

app.post("/statistic", bodyParser.json(), (req, res) => {
    if (req.body.event == "visit") {
        connectoin.query("UPDATE basic_table SET visiters = visiters + 1 WHERE id = " + req.body.id, (err, data) => {
            if (err) {
                console.log("bad querry" + err);
                return
            }
        });
    }
    if (req.body.event == "click") {
        connectoin.query("UPDATE basic_table SET wanted = wanted + 1 WHERE id = " + req.body.id, (err, data) => {
            if (err) {
                console.log("bad querry" + err);
                return
            }
        });
    }
    res.send(JSON.stringify({ ok: true }))
});

app.get("/getBooks", (req, res) => {
    connectoin.query("SELECT * from basic_table", (err, data) => {
        if (err) {
            console.log("bad querry" + err);
            return
        }
        res.send(JSON.stringify(data));
    });
});

function isAuth(req : Request, res : Response, next : NextFunction) {
    const auth = req.headers.authorization;
    console.log(auth + "----" + user)
    if (auth === user) {
      next();
    } else {
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic');
        res.end('Unauthorized');
    }
}

app.get("/admin/api/v1/", isAuth,  (req, res) => {
    res.sendFile(__dirname.replace("dist", "src") + "/admin-page.html");
});

app.post("/admin/api/v1/add", fileUpload(), (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0 || req.files.img instanceof Array) {
        return res.status(400).send(JSON.stringify({ data: "No files were uploaded." }));
    }
    let author = [req.body.author1, req.body.author2, req.body.author3].filter((el) => el != "").join(", ");
    let img = req.files.img
    let query = `INSERT INTO basic_table (name, author, year, pages, description) VALUES ('${req.body.name}', '${author}', '${req.body.year}', '${req.body.pages}', '${req.body.description}')`
    connectoin.query(query, (err, data) => {
        if (err) {
            console.log("bad querry" + err);
            res.status(500).send(res.send(JSON.stringify({ data: "Book was NOT added" })));
            return
        }
        img.mv(__dirname.replace("dist", "public") + "/book/book-page_files/img/" + data.insertId + ".jpg", () => {
            res.send(JSON.stringify({ data: "Book was added" }));
        });
    });
});

app.post("/admin/api/v1/delete", bodyParser.json(), (req, res) => {
    connectoin.query(`DELETE FROM basic_table WHERE (id = ${req.body.id})`, (err, data) => {
        if (err) {
            console.log("bad querry" + err);
            res.status(500).send(res.send(JSON.stringify({ data: "Book was NOT deleted" })));
            return
        }
        fs.unlink(__dirname.replace("dist", "public") + "/book/book-page_files/img/" + req.body.id + ".jpg", (err) => {
            if (err) {
                console.log("img was not deleted" + err);
                res.status(500).send(res.send(JSON.stringify({ data: "Book was deleted, but img was not" })));
                return
            }
            res.send(JSON.stringify({ data: "Book was deleted" }));
          });
    })
});
