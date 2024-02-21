function sendMessage() {
    const userMessage = document.getElementById("user-message").value;

    fetch('/sendMessage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `userMessage=${encodeURIComponent(userMessage)}`,
    })
    .then(response => response.json())
    .then(data => {
        // Display user message
        const userMessageDiv = document.createElement("div");
        userMessageDiv.className = "message sent";
        userMessageDiv.textContent = userMessage;
        document.getElementById("chat-box").appendChild(userMessageDiv);

        // Display server reply
        const replyDiv = document.createElement("div");
        replyDiv.className = "message received";
        replyDiv.textContent = data.replyMessage;
        document.getElementById("chat-box").appendChild(replyDiv);
       

        // Clear the input field
        document.getElementById("user-message").value = "";
       // Add auto-scroll after sending a message
       scrollToBottom(); 
    })
    .catch(error => console.error('Error:', error));
}
function handleKeyDown(event) {
    if (event.key === "Enter") {
        if (document.getElementById("user-message").value.trim() !== "") {
            sendMessage();
            scrollToBottom(); // Add auto-scroll after sending a message
        }
    }
}
function scrollToBottom() {
    var chatBox = document.getElementById("chat-box");
    chatBox.scrollTop = chatBox.scrollHeight;
}