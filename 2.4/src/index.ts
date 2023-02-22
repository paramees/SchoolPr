//---------imports and some important stuff-------------------------------
import express from 'express';
import {Request, Response} from 'express';
import { Collection, Document, MongoClient } from 'mongodb';
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const app = express();
const PORT = 5001;
const URI = "mongodb+srv://Sergey:@cluster0.4zcsikv.mongodb.net/Todo?retryWrites=true&w=majority";
let lastID = 1;

let dbList: Collection<Document>; //data base with to do list

const client = new MongoClient(URI);

declare module 'express-session' {
  interface Session {
    login?: string
  }
}
//--------------------------------------------------------------------------



//-----connectin to db---------------------------
client.connect()
  .then((client) => {
    dbList = client.db("Todo").collection("ToDoList");
    console.log("Connected to DB")
    app.listen(PORT, () => console.log(`Running on PORT ${PORT}`)); //after db connect starts server
  })
  .catch((err) => console.log("Mongo error " + err));
//-------------------------------------------------


//--------------app uses------------------------------
app.use(express.static(__dirname.replace("dist", "html")));
app.use(bodyParser.json())
app.use(session({
  store: new FileStore({}),
  key: "user_session",
  secret: 'strong password',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 100000 },
}));
//---------------------------------------------------


//--------------app V1 --------------------------------
app.route("/api/v1/items")
  .get(getItems)
  .post(addItem)
  .put(editItem)
  .delete(deleteItem)


app.post("/api/v1/login", login)

app.post("/api/v1/logout", loguot);

app.post("/api/v1/register", register);
//---------------------------------------------


//--------------app V2----------------------------
app.route("/api/v2/router")
  .post((req, res) => {
    const action = req.query.action;
    switch (action) {
      case "login" :
        login(req, res);
        break;
      case "logout" :
        loguot(req, res);
        break;
      case "register" :
        register(req, res);
        break;
      case "getItems" :
        getItems(req, res);
        break;
      case "createItem" :
        addItem(req, res);
        break;
      case "deleteItem" :
        deleteItem(req, res);
        break;
      case "editItem" :
        editItem(req, res);
        break;
      default :
      res.status(400).send(JSON.stringify({ "error": "Query string does not exist" }));
    }
  })
//-----------------------------------------------


//--------------- FUNCTIONS ---------------------------
function login (request : Request, response : Response) {
  let data = request.body;
  dbList.findOne({ login: data.login }).then(user => {
    if (user) {
      if (user.password == data.pass) {
        request.session.login = data.login;
      response.send(JSON.stringify({ "ok": true }));
      } else {
        response.status(400).send(JSON.stringify({ "error": "Wrong password" }))
      }
    } else {
      response.status(400).send(JSON.stringify({ "error": "User is not exist!" }));
    }
  })
}

function loguot (request : Request, response : Response) {
  request.session.destroy;
  request.session.regenerate;
  delete request.session.login;
  response.send(JSON.stringify({ "ok": true }));
}

function register (request : Request, response : Response) {
  const data = request.body;
  dbList.findOne({ login: data.login }).then(user => {
    if (!user) {
      request.session.login = data.login;
      dbList.insertOne({
        login: data.login,
        password: data.pass
      }).then(() => {
        response.send(JSON.stringify({ "ok": true }));
      })
    } else {
      response.status(400).send(JSON.stringify({ "error": "User is already exist!" }));
    }
  })
}

function deleteItem (request : Request, response : Response) {
  dbList.updateOne({ login: request.session.login }, {
    $pull: {
      items: {
        id: request.body.id
      }
    }
  })
    .then((res) => {
      response.send(JSON.stringify({ "ok": true }));
    })
}

function editItem (request : Request, response : Response) {
  let data = request.body
  dbList.updateOne({ login: request.session.login, "items.id": data.id }, {
    $set: {
      "items.$.text": data.text,
      "items.$.checked": data.checked
    }
  }).then((res) => {
    response.send(JSON.stringify({ "ok": true }));
  })
}

async function addItem (request : Request, response : Response) {
  let data: string = request.body.text;
    let id: number;
    let user = await dbList.findOne({ login: request.session.login })
    if (user) {
      if (user.items && user.items[0]) {
        id = user.items.reduce((acc: { id: number }, curr: { id: number }) => acc.id > curr.id ? acc : curr);
      } else {
        id = 1;
      }
    } else {
      response.status(400).send(JSON.stringify({ "error": "You are not logined in!" }));
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
}

function getItems (request : Request, response : Response) {
  dbList.findOne({ login: request.session.login }, { projection: { _id: 0 } }).then(user => {
    if (user && user.items) {
      response.send(JSON.stringify({ items: user.items }));
    } else {
      response.send(JSON.stringify({ items: [] }));
    }
  })
}
//-----------------------------------------------------