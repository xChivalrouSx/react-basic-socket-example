import io from "socket.io-client";

var socket;

export const init = (callBack) => {
	socket = io("http://localhost:3001", {
		transports: ["websocket"],
	});

	socket.on("connect", () => console.log("Connected..."));

	socket.on("newUser", (messages) => {
		callBack(messages);
	});
};

export const send = (msg, usr) => {
	socket.emit("newMessage", { message: msg, username: usr });
};

export const subscribeNewMessage = (callBack) => {
	socket.on("receive", (messageInfo) => {
		callBack(messageInfo);
	});
};
