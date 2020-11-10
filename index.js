const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const UsersRoutes = require("./router/users");
const NewsRoutes = require("./router/news");
const ContactRoute = require("./router/contact");
const ApiKeysRoute = require("./router/apiKeys");
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// db connection
require("./db-connection");

// /users
app.use(UsersRoutes);

// /news
app.use(NewsRoutes);

//route for contact file
app.use("/contact", ContactRoute);

//route for apiKeys
app.use(ApiKeysRoute);

// /chats
io.on('connection', (socket)=>{
    socket.on('message', (message)=>{
        socket.broadcast.emit('message-broadcast', message)
    })
});

http.listen(3000, () => {
    console.log("server started at 3000");
});