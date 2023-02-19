import { text } from 'body-parser';
import express from 'express';
import { Collection, Document, MongoClient } from 'mongodb';
var bodyParser = require('body-parser');


const app = express();
const PORT = 5001;
const URI = "mongodb+srv://Sergey:@cluster0.4zcsikv.mongodb.net/Todo?retryWrites=true&w=majority";
let lastID = 1;

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


app.use(express.static(__dirname.replace("dist", "html")));
app.use(bodyParser.json())

app.route("/api/v1/items")
  .get(function(request, response) { //get items
    dbList.find({}, {projection: {_id: 0}}).sort({id: 1}).toArray()
    .then((data) => {
      lastID = data.length == 0 ? 0 : data[data.length - 1].id; //calculating id
      response.send(JSON.stringify({ items : data}));
    })
  })
  .post(function(request, response) { //post item
    let data = request.body
    dbList.insertOne({
      id: ++lastID,
      text: data.text,
      checked: false
    }).then((res) => {
      response.send(JSON.stringify({ id : lastID}));
    })
  })
  .put(function(request, response) { // change item
    let data = request.body
    dbList.findOneAndUpdate({id : data.id},{$set:{
      text: data.text,
      checked: data.checked
    }}).then((res) => {
      response.send(JSON.stringify({ "ok" : Boolean(res.ok) }));
    })
  })
  .delete(function(request, response) { //delete item
    dbList.deleteOne({id: request.body.id})
    .then((res) => {
      response.send(JSON.stringify({ "ok" : Boolean(res.deletedCount) }));
    })
  })
