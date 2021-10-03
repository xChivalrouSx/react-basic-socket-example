const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const cors = require("cors");

app.use(cors());

var messageList = ["hello"];

io.on("connection", (socket) => {
	console.log("New user here.");

	socket.emit("newUser", messageList);

	socket.on("newMessage", (message) => {
		console.log(message);

		messageList.push(message);
		io.emit("receive", message);
	});

	socket.on("disconnect", () => {
		console.log("User left.");
	});
});

http.listen(3001, () => console.log("Server is up..."));