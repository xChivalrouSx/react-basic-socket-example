const ChatContent = ({ messageList }) => {
	return (
		<div>
			{messageList.map((item, index) => {
				return <div key={index}>{item}</div>;
			})}
		</div>
	);
};

export default ChatContent;
