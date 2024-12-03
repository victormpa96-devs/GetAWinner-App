const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require("./router/userRoutes");
const authRoutes = require("./router/authRoutes");
const competitorRoutes = require("./router/competitorRoutes");
const cors = require("cors");
const { connectMongoose } = require('./connections/mongoDB-connection');

app.use(cors());
app.use(bodyParser.json())

connectMongoose();

app.use("/users/", userRoutes);
app.use("/users/", authRoutes);
app.use("/competitors/", competitorRoutes);

app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
});

