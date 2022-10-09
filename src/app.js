const express = require("express");
const app = express();
const port = process.env.PORT || 8085;
require('./config');
const User = require("./data");
const ENV = require('dotenv').config();

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
// set the view engine to ejs
app.set('view engine', 'ejs');


app.get('/', async (req, res) => {
    User.find({}, (err, tasks) => {
        res.render("pages/index", { todoTasks: tasks, idTask: null});
    });
});

//POST METHOD
app.post('/', async (req, res) => {
    console.log(req.body.message)
    const todoTask = new User({ message: req.body.message });
    try {
        await todoTask.save();
        res.redirect("/");
    } catch (err) {
        res.redirect("/");
    }
});

//UPDATE
app.route("/edit/:id").get((req, res) => {
    const id = req.params.id;
    User.find({}, (err, tasks) => {
        res.render("pages/index", { todoTasks: tasks, idTask: id });
    });
}).post((req, res) => {
    const id = req.params.id;
    User.findByIdAndUpdate(id, { message: req.body.message }, err => {
        if (err) return res.send(500, err);
        res.redirect("/");
    });
});

//DELETE
app.route("/remove/:id").get((req, res) => {
    const id = req.params.id;
    User.findByIdAndRemove(id, err => {
        if (err) return res.send(500, err);
        res.redirect("/");
    });
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});