document.addEventListener("DOMContentLoaded", () => {
    const promptInput = document.getElementById("prompt");
    const submitBtn = document.getElementById("submit");
    const chatContainer = document.querySelector(".chat-container");
    const imageUploadBtn = document.getElementById("imageUpload");
    const imageInput = document.getElementById("imageInput");
    const roleSelector = document.getElementById("role");
    const pdfUploadBtn = document.getElementById("pdfUpload");
    const pdfInput = document.getElementById("pdfInput");
    const uploadedPDFs = document.getElementById("uploadedPDFs");

    // Initialize PDF.js worker
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    // Lab programs and location data
    const labPrograms = {
        "quadratic equation": { category: "Mathematics", description: "Compute the roots of a quadratic equation by accepting the coefficients. Print appropriate messages." },
        "electricity bill": { category: "Utility", description: "An electricity board charges different rates based on unit consumption. Compute and display the charges accordingly." },
        "pattern": { category: "Pattern Generation", description: "Generate a pyramid pattern using numbers based on user input for the number of rows." },
        "binary search": { category: "Searching Algorithm", description: "Implement Binary Search on integers." },
        "matrix multiplication": { category: "Matrix Operations", description: "Implement matrix multiplication and validate the rules of multiplication." },
        "taylor series": { category: "Mathematics", description: "Compute sin(x)/cos(x) using the Taylor series approximation and compare results with the built-in library function." },
        "bubble sort": { category: "Sorting Algorithm", description: "Sort a given set of numbers using the Bubble Sort algorithm." },
        "string operations": { category: "String Manipulation", description: "Implement string operations such as compare, concatenate, and find string length using functions." },
        "student marks": { category: "Data Structures", description: "Use structures to read, write, compute average marks, and list students scoring above and below average." },
        "pointers statistics": { category: "Pointers", description: "Use pointers to compute the sum, mean, and standard deviation of a set of numbers." },
        "fibonacci series": { category: "Recursion", description: "Generate the Fibonacci series up to a given number using recursion." },
        "palindrome check": { category: "String Manipulation", description: "Check if a given string or number is a palindrome." },
        "prime number": { category: "Mathematics", description: "Determine whether a given number is prime." },
        "armstrong number": { category: "Mathematics", description: "Check if a given number is an Armstrong number." },
        "factorial": { category: "Recursion", description: "Compute the factorial of a number using recursion." },
        "reverse array": { category: "Array Manipulation", description: "Reverse the elements of an array." }
    };

    const locations = {
        "cse 15 506": "CSE Lab 15 is located in Block 5, 6th Floor. Take the main elevator to the 6th floor, turn right and walk to the end of the hallway.",
        "aiml 1": "AIML Lab 1 is located in BSN CR 503 (Block 5, 3rd Floor). Take the elevator to the 3rd floor and it's the third lab on your right.",
        "aiml 2": "AIML Lab 2 is located in BSN CR 504 (Block 5, 4th Floor). Take the elevator to the 4th floor and it's the second lab on your left.",
        "aiml 5": "AIML Lab 5 is located in BSN CR 505 (Block 5, 5th Floor). Take the elevator to the 5th floor, turn right and it's the first lab you'll see.",
        "bsn cr 503": "Room BSN CR 503 is on the 3rd floor of Block 5. This is AIML Lab 1.",
        "bsn cr 504": "Room BSN CR 504 is on the 4th floor of Block 5. This is AIML Lab 2.",
        "bsn cr 505": "Room BSN CR 505 is on the 5th floor of Block 5. This is AIML Lab 5."
    };

    // Store uploaded PDF contents
    let pdfContents = {
        text: "",
        fileName: "",
        isLoaded: false
    };

    // Function to get lab program response
    function getLabProgramResponse(userText) {
        userText = userText.toLowerCase().trim();
    
        if (userText.includes("pop lab program") || userText.includes("lab programs")) {
            return "Here are the available lab programs:<br>" +
                Object.keys(labPrograms)
                    .map(key => `- <b>${key}</b> (${labPrograms[key].category}): ${labPrograms[key].description}`)
                    .join("<br>");
        }
    
        for (let key in labPrograms) {
            let keywords = key.split(" ");
            if (keywords.some(word => userText.includes(word))) {
                return `📘 <b>${labPrograms[key].category}</b>: ${labPrograms[key].description}`;
            }
        }
    
        return "🤖 I couldn't find a matching lab program. Can you try a different keyword?";
    }

    // Function to get location response
    function getLocationResponse(userText) {
        userText = userText.toLowerCase().trim();
        
        if (userText.includes("where is") || userText.includes("location of") || userText.includes("how to find")) {
            for (let key in locations) {
                if (userText.includes(key)) {
                    return `🏫 <b>Location Information:</b><br>${locations[key]}`;
                }
            }
        }
        
        for (let key in locations) {
            if (userText.includes(key)) {
                return `🏫 <b>Location Information:</b><br>${locations[key]}`;
            }
        }
        
        return null;
    }

    // Function to handle PDF file upload
    async function handlePDFUpload(file) {
        if (!file || file.type !== 'application/pdf') {
            return;
        }

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
            
            let fullText = "";
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map(item => item.str).join(" ");
                fullText += pageText + " ";
            }
            
            // Store the PDF content
            pdfContents.text = fullText.trim();
            pdfContents.fileName = file.name;
            pdfContents.isLoaded = true;
            
            // Display uploaded file
            displayUploadedPDF(file.name);
            
            // Add notification to chat
            let aiHtml = `
               
                <div class="ai-chat-area">
                    📄 <b>PDF uploaded:</b> "${file.name}" has been successfully loaded. You can now ask questions about this document!
                </div>`;
            let aiChatBox = createChatBox(aiHtml, "ai-chat-box");
            chatContainer.appendChild(aiChatBox);
            chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: "smooth" });
            
        } catch (error) {
            console.error("PDF parsing error:", error);
        }
    }
    
    // Display uploaded PDF in the UI
    function displayUploadedPDF(fileName) {
        uploadedPDFs.innerHTML = `
            <div class="uploaded-file">
                <svg class="file-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
                <span class="file-name">${fileName}</span>
                <span class="remove-file" id="removePDF">×</span>
            </div>
        `;
        
        // Add event listener to remove PDF
        document.getElementById("removePDF").addEventListener("click", () => {
            pdfContents = {
                text: "",
                fileName: "",
                isLoaded: false
            };
            uploadedPDFs.innerHTML = "";
        });
    }

    const languages = {
        "en": "English",
        "hi": "Hindi",
        "es": "Spanish", 
        "fr": "French",
        "kn": "Kannada"
    };

    let userMessage = {
        text: null,
        image: null,
    };

    function getRolePersona(userText) {
        let selectedRole = roleSelector.value;
        let rolePrefix = "";
        let persona = "";

        switch (selectedRole) {
            case "default":
                rolePrefix = "As a friendly AI assistant, ";
                persona = "";
                break;
            case "research":
                rolePrefix = "As a highly analytical research assistant, ";
                persona = "";
                break;
            case "programming":
                rolePrefix = "As a programming expert, ";
                persona = "";
                break;
            case "kcet":
                rolePrefix = "As a KCET advisor, ";
                persona = "";
                break;
            case "college":
                rolePrefix = "As your college support assistant, ";
                persona = "";
                break;
            default:
                rolePrefix = "As a helpful assistant, ";
                persona = "";
        }

        return { rolePrefix, persona };
    }

    async function generateResponse(aiChatBox) {
        let textElement = aiChatBox.querySelector(".ai-chat-area");
        let { rolePrefix, persona } = getRolePersona(userMessage.text);
        
        // Check if this is a lab program query first
        if (userMessage.text.toLowerCase().includes("lab program") || 
            userMessage.text.toLowerCase().includes("pop lab")) {
            const labResponse = getLabProgramResponse(userMessage.text);
            textElement.innerHTML = labResponse;
            return;
        }
        
        // Check if this is a location query
        const locationResponse = getLocationResponse(userMessage.text);
        if (locationResponse) {
            textElement.innerHTML = locationResponse;
            return;
        }
        
        // Get selected language
        const selectedLang = document.getElementById("language").value;
        const langName = languages[selectedLang] || "English";
        
        // Add language instruction to the prompt
        let prompt = userMessage.text;
        
        // Check if query is related to PDF and a PDF is loaded
        if (pdfContents.isLoaded && 
            (prompt.toLowerCase().includes("pdf") || 
             prompt.toLowerCase().includes("document") || 
             prompt.toLowerCase().includes("summarize") ||
             prompt.toLowerCase().includes("summary") ||
             prompt.toLowerCase().includes("key points"))) {
            
            // Add PDF context to the prompt
            prompt = `Based on the following PDF document titled "${pdfContents.fileName}", ${prompt}\n\nPDF CONTENT:\n${pdfContents.text.substring(0, 15000)}`;
        }
        
        const languageInstruction = `Please respond in ${langName} language: `;
        
        let requestBody = {
            contents: [{ 
                parts: [{ 
                    text: languageInstruction + rolePrefix + prompt 
                }] 
            }],
        };

        if (userMessage.image) {
            requestBody.contents[0].parts.push({ inline_data: userMessage.image });
        }

        try {
            let response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyD62vTZtAlmumzqslwBYgrbzWW5WrE1k58", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            });

            let data = await response.json();
            let apiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "No response received.";

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
            <div class="user-chat-area">${message}
            ${userMessage.image ? `<img src="data:${userMessage.image.mime_type};base64,${userMessage.image.data}" class="chooseimg" />` : ""}</div>`;

        promptInput.value = "";
        let userChatBox = createChatBox(userHtml, "user-chat-box");
        chatContainer.appendChild(userChatBox);
        chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: "smooth" });

        setTimeout(() => {
            let aiHtml = `
                <div class="ai-chat-area">
                    <img src="loading.webp" alt="Loading..." class="loading-icon" width="50px">
                </div>`;
            let aiChatBox = createChatBox(aiHtml, "ai-chat-box");
            chatContainer.appendChild(aiChatBox);
            generateResponse(aiChatBox);
        }, 600);
    }

    function resetImageUpload() {
        userMessage.image = null;
    }

    // Event listeners
    promptInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            handleUserMessage(promptInput.value);
        }
    });

    submitBtn.addEventListener("click", () => {
        handleUserMessage(promptInput.value);
    });

    imageUploadBtn.addEventListener("click", () => {
        imageInput.click();
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
        };
        reader.readAsDataURL(file);
    });

    // PDF upload event listener
    pdfUploadBtn.addEventListener("click", () => {
        pdfInput.click();
    });

    pdfInput.addEventListener("change", () => {
        const file = pdfInput.files[0];
        if (file) {
            handlePDFUpload(file);
        }
    });
});
