require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./routes/user");
const todo =require("./routes/todo")
const cookieSession = require("cookie-session");
const passportStrategy = require("./passport");
const authenticateJWT = require('./middlewear/auth');
const dbConnect = require("./dbConnect");
const app = express();
app.use(express.json());
dbConnect();
app.use(
	cookieSession({
		name: "session",
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 100,
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);

app.use("/auth", authRoute);
app.use("/todo",authenticateJWT,todo);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listenting on port ${port}...`));