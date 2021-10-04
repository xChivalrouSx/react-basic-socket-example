import { init, send, subscribeNewMessage } from './utils/SocketApi';
import { useEffect, useState, useRef } from 'react';
import ChatContent from './components/ChatContent'

function App() {
  const[messages, setMessages] = useState([]);
  const[message, setMessage] = useState("");
  const messageRef = useRef();

  useEffect(() => {
    init((messageList) => setMessages(messageList));
    subscribeNewMessage(message => setMessages((oldState) => [...oldState, message]));
  }, []);

  const sendMessage = () => {
      send(message);
      setMessage("");
  }

  const inputKeyDown = (e) => {
      if (e.keyCode === 13) {
          sendMessage();
      }
  }

  return (
    <div>
      <h2>Chat App</h2>
      <hr />
      <input value={message} onKeyDown={inputKeyDown} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
      <div style={{ marginTop: "10px", width: "100%", height: "80vh", border: "solid 1px", overflowY: "scroll" }}>
        <ChatContent messageList={messages} />
      </div>
    </div>
  );
}

export default App;
