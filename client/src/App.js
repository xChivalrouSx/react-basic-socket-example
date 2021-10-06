import { useEffect, useRef, useState } from "react";
import ChatContent from "./components/ChatContent";
import { init, send, subscribeNewMessage } from "./utils/SocketApi";

function App() {
	const [username] = useState("user-" + generateRandomNumber());
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState("");
	const messageRef = useRef();

	function generateRandomNumber() {
		return Math.floor(Math.random() * (100000 + 1) + 0);
	}

	useEffect(() => {
		init((messageList) => {
			setMessages(messageList);
			scrollToBottom();
		});

		subscribeNewMessage((msg) => {
			setMessages((oldState) => [...oldState, msg]);
			scrollToBottom();
		});
	}, []);

	const sendMessage = () => {
		send(message, username);
		setMessage("");
	};

	const inputKeyDown = (e) => {
		if (e.keyCode === 13) {
			sendMessage();
		}
	};

	const scrollToBottom = () => {
		messageRef.current?.scrollIntoView({
			behavior: "smooth",
		});
	};

	return (
		<div className="container">
			<div className="row text-center m-3">
				<h2>Chat App</h2>
			</div>
			<div className="row">
				<div className="col-10 text-end pt-2">Username:</div>
				<div className="col-2 text-primary pt-2">{username}</div>
			</div>
			<div className="row">
				<div
					className="col-12"
					style={{
						marginTop: "10px",
						width: "100%",
						height: "80vh",
						border: "solid 1px",
						overflowY: "scroll",
					}}
				>
					<ChatContent messageList={messages} username={username} />
					<div ref={messageRef} />
				</div>
			</div>
			<div className="row">
				<div className="col-10 p-0">
					<input
						className="form-control w-100"
						value={message}
						onKeyDown={inputKeyDown}
						onChange={(e) => setMessage(e.target.value)}
					/>
				</div>
				<div className="col-2 p-0">
					<button className="btn btn-primary w-100" onClick={sendMessage}>
						Send
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;
