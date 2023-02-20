import express from 'express';
import { Collection, Document, MongoClient } from 'mongodb';
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);


declare module 'express-session' {
  interface Session {
    login?: string
  }
}


const app = express();
const PORT = 5001;
const URI = "mongodb+srv://Sergey:@cluster0.4zcsikv.mongodb.net/Todo?retryWrites=true&w=majority";


let dbList: Collection<Document>; //data base with to do list

const client = new MongoClient(URI);

//connectin to db
client.connect()
  .then((client) => {
    dbList = client.db("Todo").collection("ToDoList");
    console.log("Connected to DB")
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

app.use(express.static(__dirname.replace("dist", "html")));
app.use(bodyParser.json())

app.route("/api/v1/items")
  .get(function (request, response) { //get items
    dbList.findOne({ login: request.session.login }, { projection: { _id: 0 } }).then(user => {
      if (user && user.items) {
        response.send(JSON.stringify({ items: user.items }));
      } else {
        response.send(JSON.stringify({ items: [] }));
      }
    })
  })

  .post(async function (request, response) { //post item
    let data: string = request.body.text;
    let id: number;
    let user = await dbList.findOne({ login: request.session.login })
    if (user) {
      if (user.items ) {
        id = user.items.reduce((acc: { id: number }, curr: { id: number }) => acc.id > curr.id ? acc : curr);
      } else {
        id = 1;
      }
    } else {
      response.status(400).send(JSON.stringify({ "error": "User is not exist!" }));
      return
    }
    dbList.updateOne({ login: request.session.login },
      {
        $push: {
          "items": {
            "id": id,
            "text": data,
            "checked": false
          }
        }
      }).then((res) => {
        response.send(JSON.stringify({ id: id }));
      })
  })

  .put(function (request, response) { // change item
    let data = request.body
    dbList.updateOne({ login: request.session.login, "items.id": data.id }, {
      $set: {
        "items.$.text": data.text,
        "items.$.checked": data.checked
      }
    }).then((res) => {
      response.send(JSON.stringify({ "ok": true }));
    })
  })

  .delete(function (request, response) { //delete item
    dbList.updateOne({ login: request.session.login }, {
      $unset: {
        items: {
          id: request.body.id
        }
      }
    })
      .then((res) => {
        response.send(JSON.stringify({ "ok": true }));
      })
  })


app.route("/api/v1/login")
  .post(function (request, response) {
    let data = request.body;
    dbList.findOne({ login: data.login }).then(user => {
      if (user) {
        request.session.login = data.login;
        response.send(JSON.stringify({ "ok": true }));
      } else {
        response.status(403).send(JSON.stringify({ "error": "User is not exist!" }));
      }
    })
  })

app.route("/api/v1/logout")
  .post(function (request, response) {
    request.session.destroy;
    request.session.regenerate;
    delete request.session.login;
    response.send(JSON.stringify({ "ok": true }));
  })

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
        })
      } else {
        response.status(403).send(JSON.stringify({ "error": "User is already exist!" }));
      }
    })
  })