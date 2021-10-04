const ChatContent = ({messageList}) => {
    return (
        <>
            {messageList.map((item, index) => {
                return <div key={index}>{item}</div>
            })}
        </>
    )
}

export default ChatContent
