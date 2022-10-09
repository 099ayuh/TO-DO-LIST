const mongoose = require("mongoose");
const ENV = require('dotenv').config();
const db = `mongodb+srv://${process.env.MyDB_name}:${process.env.MyDB_pass}@cluster0.gbiaesu.mongodb.net/${process.env.MyDB_dataBase}?retryWrites=true&w=majority`;
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DataBase Connected");
}).catch((err) => {
    console.log(err);
})

