"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const app = (0, express_1.default)();
const PORT = 5001;
const URI = "mongodb+srv://Sergey:Passw12343@cluster0.4zcsikv.mongodb.net/Todo?retryWrites=true&w=majority";
let dbList; //data base with to do list
const client = new mongodb_1.MongoClient(URI);
//connectin to db
client.connect()
    .then((client) => {
    dbList = client.db("Todo").collection("ToDoList");
    console.log("Connected to DB");
    app.listen(PORT, () => console.log(`Running on PORT ${PORT}`)); //after db connect starts server
})
    .catch((err) => console.log("Mongo error " + err));
app.use(session({
    store: new FileStore({}),
    key: "user_session",
    secret: 'strong password',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 100000 },
}));
app.use(express_1.default.static(__dirname.replace("dist", "html")));
app.use(bodyParser.json());
app.route("/api/v1/items")
    .get(function (request, response) {
    dbList.findOne({ login: request.session.login }, { projection: { _id: 0 } }).then(user => {
        if (user && user.items) {
            response.send(JSON.stringify({ items: user.items }));
        }
        else {
            response.send(JSON.stringify({ items: [] }));
        }
    });
})
    .post(function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = request.body.text;
        let id;
        let user = yield dbList.findOne({ login: request.session.login });
        if (user) {
            if (user.items) {
                id = user.items.reduce((acc, curr) => acc.id > curr.id ? acc : curr);
            }
            else {
                id = 1;
            }
        }
        else {
            response.status(400).send(JSON.stringify({ "error": "User is not exist!" }));
            return;
        }
        dbList.updateOne({ login: request.session.login }, {
            $push: {
                "items": {
                    "id": id,
                    "text": data,
                    "checked": false
                }
            }
        }).then((res) => {
            response.send(JSON.stringify({ id: id }));
        });
    });
})
    .put(function (request, response) {
    let data = request.body;
    dbList.updateOne({ login: request.session.login, "items.id": data.id }, {
        $set: {
            "items.$.text": data.text,
            "items.$.checked": data.checked
        }
    }).then((res) => {
        response.send(JSON.stringify({ "ok": true }));
    });
})
    .delete(function (request, response) {
    dbList.updateOne({ login: request.session.login }, {
        $unset: {
            items: {
                id: request.body.id
            }
        }
    })
        .then((res) => {
        response.send(JSON.stringify({ "ok": true }));
    });
});
app.route("/api/v1/login")
    .post(function (request, response) {
    let data = request.body;
    dbList.findOne({ login: data.login }).then(user => {
        if (user) {
            request.session.login = data.login;
            response.send(JSON.stringify({ "ok": true }));
        }
        else {
            response.status(403).send(JSON.stringify({ "error": "User is not exist!" }));
        }
    });
});
app.route("/api/v1/logout")
    .post(function (request, response) {
    request.session.destroy;
    request.session.regenerate;
    delete request.session.login;
    response.send(JSON.stringify({ "ok": true }));
});
app.route("/api/v1/register")
    .post(function (request, response) {
    let data = request.body;
    dbList.findOne({ login: data.login }).then(user => {
        if (!user) {
            request.session.login = data.login;
            dbList.insertOne({
                login: data.login,
                password: data.password
            }).then(() => {
                response.send(JSON.stringify({ "ok": true }));
            });
        }
        else {
            response.status(403).send(JSON.stringify({ "error": "User is already exist!" }));
        }
    });
});
