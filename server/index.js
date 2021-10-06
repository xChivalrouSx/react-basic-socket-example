const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const cors = require("cors");

app.use(cors());

var messageList = [{ username: "System Message", message: "hello" }];

io.on("connection", (socket) => {
	console.log("New user here.");

	socket.emit("newUser", messageList);

	socket.on("newMessage", (messageInfo) => {
		console.log(messageInfo);

		messageList.push(messageInfo);
		io.emit("receive", messageInfo);
	});

	socket.on("disconnect", () => {
		console.log("User left.");
	});
});

http.listen(3001, () => console.log("Server is up..."));
