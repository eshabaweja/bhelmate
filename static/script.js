var chatContainer = document.getElementById("chat-container");
var messageForm = document.getElementById("message-form");
var messageInput = document.getElementById("message-input");

messageForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var message = messageInput.value.trim();
    if (message !== "") {
        var userMessage = document.createElement("p");
        userMessage.innerText = message;
        userMessage.classList.add("user-message");
        chatContainer.appendChild(userMessage);
        messageInput.value = "";

        // Scroll to the bottom of the chat container
        chatContainer.scrollTop = chatContainer.scrollHeight;

        // Submit the form asynchronously
        fetch("/parse", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "value1=" + encodeURIComponent(message)
        })
            .then(function (response) {
                // debug
                // console.log("Response from rasa:", response);
                return response.json();
            })
            .then(function (result) {
                // debug
                // console.log("Response from Rasa:", result);
                // Parse the response and update the chat container
                try {
                    // var response = JSON.parse(result);
                    for (var i = 0; i < result.length; i++) {
                        var botMessage = document.createElement("p");
                        // botMessage.innerText = "Bot: " + response[i].text;
                        botMessage.innerText = result[i];
                        // console.log(typeof(result))
                        botMessage.classList.add("bot-message");
                        chatContainer.appendChild(botMessage);
                    }
                } catch (error) {
                    // console.error("Error parsing JSON:", error);
                    console.error("Error displaying result:", error);
                }

                // Scroll to the bottom of the chat container
                chatContainer.scrollTop = chatContainer.scrollHeight;
            })

            .catch(function (error) {
                console.error("Error:", error);
            });
    }
});