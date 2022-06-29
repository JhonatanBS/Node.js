const express = require("express");

const app = express();

//Router
const Router = require("./routers/accountRouter");

// middleware
app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use("/", Router);

app.listen(3333);