const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:127.0.0.1/media-app", {
    useNewUrlParser: true
});