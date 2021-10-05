import { useEffect, useRef, useState } from "react";
import ChatContent from "./components/ChatContent";
import { init, send, subscribeNewMessage } from "./utils/SocketApi";

function App() {
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState("");
	const messageRef = useRef();

	useEffect(() => {
		init((messageList) => {
			setMessages(messageList);
			scrollToBottom();
		});

		subscribeNewMessage((message) => {
			setMessages((oldState) => [...oldState, message]);
			scrollToBottom();
		});
	}, []);

	const sendMessage = () => {
		send(message);
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
				<div
					style={{
						marginTop: "10px",
						width: "100%",
						height: "80vh",
						border: "solid 1px",
						overflowY: "scroll",
					}}
				>
					<ChatContent messageList={messages} />
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
				<div className="col-2 text-end p-0">
					<button className="btn btn-primary w-100" onClick={sendMessage}>
						Send
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;
