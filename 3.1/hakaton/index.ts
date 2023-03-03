import express from 'express';
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

enum Buttons {
    plus = "plus",
    minus = "minus"
}

app.listen(PORT, () => console.log(`Running on PORT ${PORT}`));

app.use(bodyParser.json())
app.use(express.static(__dirname.replace("dist", "html")));

app.post("/", ((req, res) => {
    let plus = req.body.plus;
    let minus = req.body.minus;
    if (req.body.btn == Buttons.plus) plus++;
    if (req.body.btn == Buttons.minus) minus++;

    res.send(JSON.stringify({plus : plus, minus : minus}))
}));