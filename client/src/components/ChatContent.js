const ChatContent = ({ messageList, username }) => {
	return (
		<div>
			{messageList.map((item, index) => {
				const isCurrentUser = item.username === username;
				return (
					<div
						key={index}
						className={(isCurrentUser ? "text-end" : "") + " mt-5"}
					>
						<span
							className={
								(isCurrentUser ? "border-success" : "border-primary") +
								" border rounded-pill p-3 mb-2"
							}
						>
							<span className="text-danger">{item.username + ": "}</span>
							{item.message}
						</span>
					</div>
				);
			})}
		</div>
	);
};

export default ChatContent;
