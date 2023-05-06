const express = require("express");
const { connection } = require("./db");
const { userRoute } = require("./routes/user.routes");
const { auth } = require("./middlware/auth");
const { bookRoute } = require("./routes/book.routes");
const app = express();
require('dotenv').config()
app.use(express.json());

app.use("/user", userRoute);

// app.use(auth);

app.use("/books", bookRoute);



app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("mongorunning");
  } catch (error) {
    console.log(error);
  }
  console.log("server running");
});
