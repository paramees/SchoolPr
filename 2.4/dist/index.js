"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
var bodyParser = require('body-parser');
const app = (0, express_1.default)();
const PORT = 5001;
const URI = "mongodb+srv://Sergey:Passw123@cluster0.4zcsikv.mongodb.net/Todo?retryWrites=true&w=majority";
let lastID = 1;
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
app.use(express_1.default.static(__dirname.replace("dist", "html")));
app.use(bodyParser.json());
app.route("/api/v1/items")
    .get(function (request, response) {
    dbList.find({}, { projection: { _id: 0 } }).sort({ id: 1 }).toArray()
        .then((data) => {
        console.log(data);
        lastID = data.length == 0 ? 0 : data[data.length - 1].id;
        console.log(lastID);
        response.send(JSON.stringify({ items: data }));
    });
})
    .post(function (request, response) {
    let data = request.body;
    dbList.insertOne({
        id: ++lastID,
        text: data.text,
        checked: false
    }).then((res) => {
        response.send(JSON.stringify({ id: lastID }));
    });
})
    .put(function (request, response) {
    let data = request.body;
    dbList.findOneAndUpdate({ id: data.id }, { $set: {
            text: data.text,
            checked: data.checked
        } }).then((res) => {
        response.send(JSON.stringify({ "ok": Boolean(res.ok) }));
    });
})
    .delete(function (request, response) {
    dbList.deleteOne({ id: request.body.id })
        .then((res) => {
        response.send(JSON.stringify({ "ok": Boolean(res.deletedCount) }));
    });
});
