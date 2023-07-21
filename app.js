const express = require('express');
const mongoose = require('mongoose');
const urlRoutes = require('./routes/urlRoutes');

const app = express();
const PORT = 4000;

app.use(express.json());
app.use('/', urlRoutes);


const URL = "mongodb+srv://ranjanpriti2010:user123@cluster0.322dbbs.mongodb.net/";
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("DB Connected")
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
