document.addEventListener("DOMContentLoaded", () => {
    const promptInput = document.querySelector("#prompt");
    const submitBtn = document.querySelector("#submit");
    const chatContainer = document.querySelector(".chat-container");
    const imageBtn = document.querySelector("#image");
    const imageElement = document.querySelector("#image img");
    const imageInput = document.querySelector("#image input");
    const promptSelector = document.querySelector("#promptSelector");
    const roleSelector = document.querySelector("#role"); // Role Selector

    const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyD62vTZtAlmumzqslwBYgrbzWW5WrE1k58";

    let userMessage = {
        text: null,
        image: null,
    };

    function getRolePersona(userText) {
        let selectedRole = roleSelector.value;
        let rolePrefix = "";
        let persona = "";

        switch (selectedRole) {
            case "general":
                rolePrefix = "As a friendly AI assistant, ";
                persona = "😊 Hi there! How can I help you today? Let's figure this out together!";
                break;
            case "research":
                rolePrefix = "As a highly analytical research assistant, ";
                persona = "🔬 Let's dive deep into this! I'll provide you with well-researched insights.";
                break;
            case "programming":
                rolePrefix = "As a programming expert, ";
                persona = "💻 Code is life! Let's debug and solve this step by step.";
                break;
            case "kcet":
                rolePrefix = "As a KCET advisor, ";
                persona = "🎓 Hey future engineer! Let me guide you through KCET prep.";
                break;
            case "college":
                rolePrefix = "As your college support assistant, ";
                persona = "🏫 Welcome to BMSIT Support! Got any college-related queries? I'm here for you!";
                break;
        }

        return { rolePrefix, persona };
    }

    async function generateResponse(aiChatBox) {
        let textElement = aiChatBox.querySelector(".ai-chat-area");
        let { rolePrefix, persona } = getRolePersona(userMessage.text);

        let requestBody = {
            contents: [{ parts: [{ text: rolePrefix + userMessage.text }] }],
        };

        if (userMessage.image) {
            requestBody.contents[0].parts.push({ inline_data: userMessage.image });
        }

        try {
            let response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            });

            let data = await response.json();
            let apiResponse =
                data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "No response received.";

            // Introduce as BMSIT Assistant if user asks "Who are you?"
            if (/who\s*are\s*you/i.test(userMessage.text)) {
                apiResponse = `I am the **BMSIT Assistant**! ${persona}`;
            } else {
                apiResponse = `${persona}\n\n${apiResponse.replace(/\n/g, "<br>")}`;
            }

            textElement.innerHTML = apiResponse;
        } catch (error) {
            console.error("API Fetch Error:", error);
            textElement.innerHTML = "⚠️ Error retrieving response. Please try again later.";
        } finally {
            chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: "smooth" });
            resetImageUpload();
        }
    }

    function createChatBox(content, className) {
        let div = document.createElement("div");
        div.innerHTML = content;
        div.classList.add(className);
        return div;
    }

    function handleUserMessage(message) {
        if (!message.trim()) return;
        userMessage.text = message;

        let userHtml = `
            <img src="user.png" alt="User" width="8%">
            <div class="user-chat-area">${message}
            ${userMessage.image ? `<img src="data:${userMessage.image.mime_type};base64,${userMessage.image.data}" class="chooseimg" />` : ""}</div>`;

        promptInput.value = "";
        let userChatBox = createChatBox(userHtml, "user-chat-box");
        chatContainer.appendChild(userChatBox);
        chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: "smooth" });

        setTimeout(() => {
            let aiHtml = `
                <img src="ai.png" alt="AI" width="10%">
                <div class="ai-chat-area">
                    <img src="loading.webp" alt="Loading..." class="loading-icon" width="50px">
                </div>`;
            let aiChatBox = createChatBox(aiHtml, "ai-chat-box");
            chatContainer.appendChild(aiChatBox);
            generateResponse(aiChatBox);
        }, 600);
    }

    function resetImageUpload() {
        imageElement.src = "img.svg";
        imageElement.classList.remove("selected");
        userMessage.image = null;
    }

    promptInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            handleUserMessage(promptInput.value);
        }
    });

    submitBtn.addEventListener("click", () => {
        handleUserMessage(promptInput.value);
    });

    imageInput.addEventListener("change", () => {
        const file = imageInput.files[0];
        if (!file) return;

        let reader = new FileReader();
        reader.onload = (e) => {
            let base64string = e.target.result.split(",")[1];
            userMessage.image = {
                mime_type: file.type,
                data: base64string,
            };
            imageElement.src = `data:${userMessage.image.mime_type};base64,${userMessage.image.data}`;
            imageElement.classList.add("selected");
        };
        reader.readAsDataURL(file);
    });

    imageBtn.addEventListener("click", () => {
        imageInput.click();
    });

    promptSelector.addEventListener("change", (e) => {
        let selectedPrompt = e.target.value;
        if (selectedPrompt) {
            handleUserMessage(selectedPrompt);
        }
    });
});
