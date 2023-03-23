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


//---------------------------------------------BOOKS PAGE------------------------------------------
app.get("/", (req, res) => {
    fs.readFile(__dirname.replace("dist", "src") + "/books-page.html", "utf-8", (err, page) => {
        if (err) { console.log(err) } else { //getting data
            let query = `SELECT books.id, books.name, books.year, books.pages, books.description, books.visiters, books.wanted, GROUP_CONCAT(authors.author SEPARATOR ', ') AS author 
            FROM books 
            JOIN authors_books ON books.id = authors_books.book_id 
            JOIN authors ON authors_books.author_id = authors.id 
            GROUP BY books.id;`;
            connectoin.query(query, (err: string | null, data: bdData[]) => {
                //console.log(data)
                if (err || data.length == 0) {
                    console.log("bad querry" + err);
                    res.status(500).send(JSON.stringify({ data: "db err" }));
                } else {
                    let booksHTML = "";
                    let start = 0;
                    let pageCur = 1;
                    if (req.query.offset) {
                        start = Number(req.query.offset) - 10;
                        pageCur = Number(req.query.offset) / 10;
                    }

                    data.slice(start, start + 10).forEach((book) => { //PATTERN TO HTML
                        booksHTML += ` 
                        <div data-book-id="${book.id}" class="book_item col-xs-6 col-sm-3 col-md-2 col-lg-2">
                            <div class="book">
                                <a href="http://localhost:3000/book/${book.id}">
                                    <img src="./book-page_files/img/${book.id}.jpg" alt="${book.name}">
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

//---------------------------------------------BOOK BY ID------------------------------------------
app.get("/book/:id", bodyParser.json(), (req, res) => {
    if (!Number(req.params.id)) {
        res.status(400).send(JSON.stringify({ data: "wrong id" }));
        return
    }
    fs.readFile(__dirname.replace("dist", "src") + "/book-page.html", "utf-8", (err, page) => {
        if (err) { console.log(err) } else {
            let query = `SELECT books.id, books.name, books.year, books.pages, books.description, books.visiters, books.wanted, GROUP_CONCAT(authors.author SEPARATOR ', ') AS author
            FROM books 
            JOIN authors_books ON books.id = authors_books.book_id 
            JOIN authors ON authors_books.author_id = authors.id 
            WHERE books.id = ${req.params.id} 
            GROUP BY books.id;`;
            connectoin.query(query, (err, data) => {
                console.log(data)
                if (err || data.length == 0) {
                    console.log("bad querry" + err);
                    res.status(500).send(JSON.stringify({ data: "db err" }));
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

//---------------------------------------------VISITS AND WANT STATS------------------------------------------
app.post("/statistic", bodyParser.json(), (req, res) => {
    if (req.body.event == "visit") {
        connectoin.query("UPDATE books SET visiters = visiters + 1 WHERE id = " + req.body.id, (err, data) => {
            if (err) {
                console.log("bad querry" + err);
                return
            }
        });
    }
    if (req.body.event == "click") {
        connectoin.query("UPDATE books SET wanted = wanted + 1 WHERE id = " + req.body.id, (err, data) => {
            if (err) {
                console.log("bad querry" + err);
                return
            }
        });
    }
    res.send(JSON.stringify({ ok: true }))
});

//---------------------------------------------SEND ARRAY OF BOOKS------------------------------------------
app.get("/getBooks", (req, res) => {
    let query = `SELECT books.id, books.name, books.year, books.pages, books.description, books.visiters, books.wanted, GROUP_CONCAT(authors.author SEPARATOR ', ') AS author 
          FROM books 
            JOIN authors_books ON books.id = authors_books.book_id 
            JOIN authors ON authors_books.author_id = authors.id 
            GROUP BY books.id;`;
    connectoin.query(query, (err, data) => {
        if (err) {
            console.log("bad querry" + err);
            return
        }
        res.send(JSON.stringify(data));
    });
});

//---------------------------------------------BASIC AUTH func------------------------------------------
function isAuth(req: Request, res: Response, next: NextFunction) {
    const auth = req.headers.authorization;
    if (auth === user) {
        next();
    } else {
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic');
        res.end('Unauthorized');
    }
}

//---------------------------------------------SEND HTML ADMIN------------------------------------------
app.get("/admin/api/v1/", isAuth, (req, res) => {
    res.sendFile(__dirname.replace("dist", "src") + "/admin-page.html");
});

//---------------------------------------------ADD BOOK func------------------------------------------
app.post("/admin/api/v1/add", fileUpload(), (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0 || req.files.img instanceof Array) {
        return res.status(400).send(JSON.stringify({ data: "No files were uploaded." }));
    }
//---------------------------------------------Creating query strs and vatiables------------------------------------------
    let authorsString: string = req.body.authors
    let authors: string[] = authorsString.split(",").map(el => el.trim()).filter((el) => el != "");
    let img = req.files.img
    let queryBook = `INSERT INTO books (name, year, pages, description) VALUES ('${req.body.name}', '${req.body.year}', '${req.body.pages}', '${req.body.description}')`;
    let queryAuthor = `SELECT id, author FROM authors WHERE author IN (`
    for (let i = 0; i < authors.length; i++) {
        queryAuthor += "'" + authors[i] + "'";
        if (i != (authors.length - 1)) queryAuthor += ", ";
    }
    queryAuthor += ");";
//---------------------------------------------Add book-----------------------------------------------------------
    connectoin.query(queryBook, (err, dataBook) => {
        if (err) {
            console.log("bad querry" + err);
            res.status(500).send(JSON.stringify({ data: "Book was NOT added" }));
            return
        }
        let bookId = dataBook.insertId; //BOOK ID
        let newAuthors: string[] = [];
//---------------------------------------------Check do we have authors-----------------------------------------------------------
        connectoin.query(queryAuthor, (err, dataAuthors) => {
            if (err) {
                console.log("bad querry" + err);
                res.status(500).send(JSON.stringify({ data: "Book was NOT added" }));
                return
            }
            if (dataAuthors[0]) { //if there already are some authors in DB
                for (let i = 0; i < dataAuthors.length; i++) {
                    newAuthors = authors.filter((el) => el !== dataAuthors[i].author)
                    console.log(dataAuthors[i].id)
                    connectoin.query(`INSERT INTO authors_books (author_id, book_id) VALUES ('${dataAuthors[i].id}', '${bookId}')`, (err, data) => {
                        if (err) {
                            console.log("bad querry" + err);
                            res.status(500).send(JSON.stringify({ data: "Book was NOT added" }));
                            return
                        }
                    });
                }
            } else {
                newAuthors = authors;
            }
                    //add authors that do not exist in DB
            for (let i = 0; i < newAuthors.length; i++) {
                connectoin.query(`INSERT INTO authors (author) VALUE ('${newAuthors[i]}');`, (err, insertData) => {
                    if (err) {
                        console.log("bad querry" + err);
                        res.status(500).send(JSON.stringify({ data: "Book was NOT added" }));
                        return
                    }
//---------------------------------------------Create values in authors_books-----------------------------------------------------------
                    connectoin.query(`INSERT INTO authors_books (author_id, book_id) VALUES ('${insertData.insertId}', '${bookId}')`, (err, data) => {
                        if (err) {
                            console.log("bad querry" + err);
                            res.status(500).send(JSON.stringify({ data: "Book was NOT added" }));
                            return
                        }
                    });
                });
            }
//---------------------------------------------Add image-----------------------------------------------------------
            img.mv(__dirname.replace("dist", "public") + "/book/book-page_files/img/" + bookId + ".jpg", () => {
                res.send(JSON.stringify({ data: "Book was added" }));
            });
        });
    });
});

//---------------------------------------------Delete func------------------------------------------
app.post("/admin/api/v1/delete", bodyParser.json(), (req, res) => {
    connectoin.query(`UPDATE books SET deletion = adddate(now(), interval +1 DAY) WHERE (id = ${req.body.id})`, (err, data) => {
        if (err) {
            console.log("bad querry" + err);
            res.status(500).send(res.send(JSON.stringify({ data: "Book was NOT deleted" })));
            return
        }
        res.send(JSON.stringify({ data: "Book was deleted" }));
    })
});
