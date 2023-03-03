"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = require('body-parser');
const app = (0, express_1.default)();
const PORT = 5000;
var Buttons;
(function (Buttons) {
    Buttons["plus"] = "plus";
    Buttons["minus"] = "minus";
})(Buttons || (Buttons = {}));
app.listen(PORT, () => console.log(`Running on PORT ${PORT}`));
app.use(bodyParser.json());
app.use(express_1.default.static(__dirname.replace("dist", "html")));
app.post("/", ((req, res) => {
    let plus = req.body.plus;
    let minus = req.body.minus;
    if (req.body.btn == Buttons.plus)
        plus++;
    if (req.body.btn == Buttons.minus)
        minus++;
    res.send(JSON.stringify({ plus: plus, minus: minus }));
}));
