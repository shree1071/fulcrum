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
//pop questions
const popq= {
    "computer components": {
        category: "Computer Basics",
        description: "Define a computer and explain the important components of a computer system"
    },
    "input and output devices": {
        category: "Computer Basics",
        description: "Explain any two input and output devices in a computer"
    },
    "C programming features": {
        category: "C Language Fundamentals",
        description: "Describe the important features of the C programming language"
    },
    "C program structure": {
        category: "C Language Fundamentals",
        description: "Explain the basic structure of a C program with an example"
    },
    "identifiers in C": {
        category: "C Language Fundamentals",
        description: "Define an identifier, explain the rules for a valid identifier, and demonstrate variable declarations"
    },
    "constants in C": {
        category: "C Language Fundamentals",
        description: "Explain the two ways of defining constants in a C program"
    },
    "data types in C": {
        category: "C Language Fundamentals",
        description: "Define data types and explain different data types supported by C with examples"
    },
    "if-else statement": {
        category: "Control Flow",
        description: "Explain the if-else statement with a flowchart and example program"
    },
    "break vs continue": {
        category: "Control Flow",
        description: "Differentiate between break and continue statements in C"
    },
    "simple calculator program": {
        category: "Programming Practice",
        description: "Write a C program to implement a simple calculator"
    },
    "C program files": {
        category: "C Language Fundamentals",
        description: "List and explain different types of files used in a C program"
    },
    "C keywords": {
        category: "C Language Fundamentals",
        description: "List and explain any five keywords from C language"
    },
    "types of constants": {
        category: "C Language Fundamentals",
        description: "List different types of constants in C: Integer, floating, character, string"
    },
    "C operators": {
        category: "Operators",
        description: "List and explain operators in C: Arithmetic, relational, equality, logical, unary, conditional, bitwise, assignment, comma, sizeof"
    },
    "operator precedence": {
        category: "Operators",
        description: "Explain operator precedence and associativity"
    },
    "type conversion and casting": {
        category: "Data Types",
        description: "Explain type conversion and type casting in C"
    },
    "arithmetic operators": {
        category: "Operators",
        description: "Demonstrate the working of arithmetic operators in C"
    },
    "relational operators": {
        category: "Operators",
        description: "Demonstrate the working of relational operators in C"
    },
    "logical operators": {
        category: "Operators",
        description: "Demonstrate the working of logical operators in C"
    },
    "assignment operators": {
        category: "Operators",
        description: "Demonstrate the working of assignment operators in C"
    },
    "increment and decrement operators": {
        category: "Operators",
        description: "Demonstrate the working of increment/decrement operators in C"
    },
    "ternary operator": {
        category: "Operators",
        description: "Demonstrate the working of the ternary operator in C"
    },
    "bitwise operators": {
        category: "Operators",
        description: "Demonstrate the working of bitwise operators in C"
    },
    "sizeof operator": {
        category: "Operators",
        description: "Demonstrate the working of sizeof() operator in C"
    },
    "sum of two numbers": {
        category: "Programming Practice",
        description: "Write a C program to find the sum of two numbers"
    },
    "area of a rectangle": {
        category: "Programming Practice",
        description: "Write a C program to find the area of a rectangle"
    },
    "simple interest program": {
        category: "Programming Practice",
        description: "Write a C program to find Simple Interest"
    },
    "swap two numbers": {
        category: "Programming Practice",
        description: "Write a C program to swap two numbers"
    },
    "swap numbers without third variable": {
        category: "Programming Practice",
        description: "Write a C program to swap two numbers without using a third variable"
    },
    "voting eligibility": {
        category: "Control Flow",
        description: "Write a C program to check voting eligibility using simple if/if-else"
    },
    "positive or negative number": {
        category: "Control Flow",
        description: "Write a C program to check if a number is positive or negative using simple if/if-else"
    },
    "odd or even check": {
        category: "Control Flow",
        description: "Write a C program to check if a number is odd or even using simple if/if-else"
    },
    "largest of 2 numbers": {
        category: "Control Flow",
        description: "Write a C program to find the largest of two numbers using simple if/if-else"
    },
    "largest of 3 numbers": {
        category: "Control Flow",
        description: "Write a C program to find the largest of three numbers using simple if/if-else"
    },
    "largest of 3 numbers nested if": {
        category: "Control Flow",
        description: "Write a C program to find the largest of three numbers using nested if statements"
    },
    "calculator using switch": {
        category: "Control Flow",
        description: "Write a C program to simulate a calculator using switch statement"
    },
    "electricity bill program": {
        category: "Programming Practice",
        description: "Write a C program to calculate electricity charges based on unit consumption"
    },
    "transport ticket pricing": {
        category: "Programming Practice",
        description: "Write a C program to calculate ticket price based on age and luggage weight"
    },
    "quadratic equation roots": {
        category: "Mathematics",
        description: "Write a C program to compute the roots of a quadratic equation"
    },
    "sum of natural numbers": {
        category: "Loops",
        description: "Write a C program to find the sum of first n natural numbers using while loop"
    },
    "factorial using while": {
        category: "Loops",
        description: "Write a C program to find the factorial of a number using while loop"
    },
    "sum of series": {
        category: "Loops",
        description: "Write a C program to compute the sum of series 1 + X + X^2 + ... + X^n using while loop"
    },
    "reverse number and palindrome": {
        category: "Loops",
        description: "Write a C program to reverse a number and check if it is a palindrome"
    },
    "GCD and LCM using Euclid's algorithm": {
        category: "Mathematics",
        description: "Write a C program to compute the GCD and LCM of two numbers using Euclid's algorithm"
    },
    "square root program": {
        category: "Mathematics",
        description: "Write a C program to find the square root of a number using while loop"
    },
    "prime number check": {
        category: "Loops",
        description: "Write a C program to check if a number is prime using for loop"
    },
    "fibonacci series": {
        category: "Loops",
        description: "Write a C program to print the Fibonacci series using for loop"
    },
    "functions in C": {
        category: "Functions",
        description: "Write C programs demonstrating all four categories of functions"
    },
    "prime number using functions": {
        category: "Functions",
        description: "Write a C program using functions to check if a number is prime"
    },
    "pattern printing": {
        category: "Loops",
        description: "Write C programs to print various patterns using loops"
    },
    "break, continue, goto": {
        category: "Control Flow",
        description: "Demonstrate break, continue, and goto statements with an example program"
    }
};


    const locations = {
        "cse 15 506": "CSE Lab 15 is located in Block 5, 6th Floor. Take the main elevator to the 6th floor, turn right and walk to the end of the hallway.",
        "aiml 1": "AIML Lab 1 is located in BSN CR 503 (Block 5, 3rd Floor). Take the elevator to the 3rd floor and it's the third lab on your right.",
        "aiml 2": "AIML Lab 2 is located in BSN CR 504 (Block 5, 4th Floor). Take the elevator to the 4th floor and it's the second lab on your left.",
        "aiml 5": "AIML Lab 5 is located in BSN CR 505 (Block 5, 5th Floor). Take the elevator to the 5th floor, turn right and it's the first lab you'll see.",
        "bsn cr 503": "Room BSN CR 503 is on the 3rd floor of Block 5. This is AIML Lab 1.",
        "bsn cr 504": "Room BSN CR 504 is on the 4th floor of Block 5. This is AIML Lab 2.",
        "bsn cr 505": "Room BSN CR 505 is on the 5th floor of Block 5. This is AIML Lab 5.",
        "cse 1": "Room BSN CR 505 is on the 6th floor of Block 5. This is CSE Lab 15.",
    };
    

    const calendarEvents = [
        { date: "13-14 Mar", event: "Course Registration for II Semester" },
        { date: "17 Mar", event: "Commencement of II II Semester Classes" },
        { date: "31 Mar", event: "Qutub-e-Ramzan" },
        { date: "07 Apr", event: "Faculty Feedback by Students" },
        { date: "10 Apr", event: "Mahavir Jayanti" },
        { date: "14 Apr", event: "Ambedkar Jayanthi" },
        { date: "16 Apr", event: "Announcement of Continuous Comprehensive Assessment (CCA)" },
        { date: "18 Apr", event: "Good Friday" },
        { date: "25-26 Apr", event: "Ugsha" },
        { date: "30 Apr", event: "Basava Jayanthi" },
        { date: "01 May", event: "May Day" },
        { date: "08 May", event: "IAI QPs Scrutiny" },
        { date: "13-16 May", event: "Internal Assessment 1" },
        { date: "22 May", event: "Last date to enter IAI Marks in Continue Portal" },
        { date: "23-24 May", event: "Dropping of the courses" },
        { date: "24 May", event: "Parents Teachers Meeting" },
        { date: "26 May", event: "Finalization of CCA Marks" },
        { date: "16-14 Jun", event: "Finalization of CCAs Marks" },
        { date: "20 Jun", event: "IAI QPs Scrutiny" },
        { date: "16-20 Jun", event: "Conduction of Lab Internals in regular lab slots" },
        { date: "25-28 Jun", event: "Internal Assessment 2" },
        { date: "03 Jul", event: "Last date to submit Marks in Portal" },
        { date: "03-08 Jul", event: "Faculty and Attendance in Continues Portal" },
        { date: "08 Jul", event: "Freezing of CIE Marks" },
        { date: "09 Jul", event: "Last Working Day of II Semester" }
    ];

    const holidays = calendarEvents
        .filter(event => 
            event.event.toLowerCase().includes('holiday') || 
            event.event.toLowerCase().includes('jayanthi') || 
            ['good friday', 'may day', 'qutub-e-ramzan'].includes(event.event.toLowerCase())
        )
        .map(event => `• ${event.event} on ${event.date}`);

    const languages = {
        "en": "English",
        "hi": "Hindi",
        "es": "Spanish", 
        "fr": "French",
        "kn": "Kannada"
    };

    // PDF contents for multiple documents
    let pdfContents = {
        cloudComputing: {
            text: `B.E COMPUTER SCIENCE AND ENGINEERING
Choice Based Credit System (CBCS) applicable for 2024 Scheme
SEMESTER – I
Introduction to Cloud Computing (3:0:0) 3
(Effective from the academic year 2024-25)
Subject Code 24ETC15C/25C CIE Marks 50
Teaching Hours/Week (L :T:P) 3:0:0 SEE Marks 50
Total Number of Contact Hours 40 Exam Hours 3
Course Objectives:
This course will enable the students to:
1. Explain the fundamentals of cloud computing
2. Illustrate the cloud application programming and Aneka platform
3. Contrast different cloud platforms used in industry
Preamble:
In today's rapidly evolving technological landscape, cloud computing has emerged as a
transformative force, reshaping the way businesses and individuals interact with digital resources.
By offering scalable, on-demand access to computing power, storage, and various applications,
cloud computing provides unprecedented flexibility and efficiency.
Module – 1
Introduction: Understanding Cloud Computing: Origins and Influences, Basic Concepts and
Terminology, Goals and Benefits, Risks and Challenges.
Chapter-3 (8 Hours)
Module – 2
Fundamental Concepts and Models: Roles and Boundaries, Cloud Characteristics, Cloud
Delivery Models, Cloud Deployment Models.
Chapter-4 (8 Hours)
Module – 3
Cloud-Enabling Technology: Broadband Networks and Internet Architecture, Data Centre
Technology, Virtualization Technology, Web Technology, Multitenant Technology,
Containerization.
Chapter-5 (8 Hours)
Module – 4
Cloud Infrastructure Mechanisms: Logical Network Perimeter, Virtual Server, Cloud Storage Device,
Cloud Usage Monitor, Resource Replication, Ready-Made Environment.
Cloud Delivery Model Considerations: Cloud Delivery Models: The Cloud Provider Perspective.
Chapter-7, Chapter-14 (8 Hours)
Module – 5
Cloud Delivery Model Considerations: Cloud Delivery Models: The Cloud Consumer Perspective.
Fundamental Cloud Security: Basic Terms and Concepts, Threat Agents, Cloud Security Threats,
Additional Considerations.
Chapter-14, Chapter-6 (8 Hours)
Course outcomes:
The students will be able to:

1. Understand the basic concepts and terminologies of cloud computing
2. Apply the concept of cloud computing to different real word examples
3. Analysis the cloud frameworks and technologies for different IT Industry
4. Design real word cloud applications
5. Study the framework of Aneka cloud for data intensive Application
Text Books
1.Cloud Computing: Concepts, Technology & Architecture, by Zaigham Mahmood, Ricardo
Puttini, Thomas Erl, Released May 2013, Publisher(s): Pearson, ISBN: 9780133387568
References
1. Dan C. Marinescu, Morgan Kaufmann, Cloud Computing Theory and Practice, Elsevier,
2nd Edition 2013.
Alternate Assessment Tools (AATs) suggested:
1. Technical Presentations
2. Project-Based Assessments
Web links / e – resources:
1. Cloud Computing - Overview (youtube.co m)
https://www.youtube.com/watch?v=NzZXz3fJf6o&list=PLShJJCRzJWxhz7SfG4hpaBD5bKOloW
x9J`,
            fileName: "Cloud Computing.pdf",
            isLoaded: true
        },
        pythonProgramming: {
            text: `Introduction to Python Programming (2:0:2) 3 
(Effective from the academic year 2024-25) 
Course Code BPLC15B/25B CIE Marks 50 
Teaching Hours/Week (L:T:P) 2:0:2 SEE Marks 50 
Total Number of Contact 
Hours 
26 hours of theory 
+ 
14 hours of Practical 
Exam Hours 3 
Course Objectives: 
This course will enable students to: 
1. Learn fundamental features of Python 
2. Set up Python IDE to create, debug and run simple Python programs. 
3. Learn object oriented concepts using programming examples. 
4. Study the concepts of modular programming & recursion. 
Preamble: Python is an open-sourced programming language that combines the features of C and 
Java. It has exceptional procedural as well as object-oriented capabilities. Its simplicity and 
readability make it an ideal choice for beginners, while its extensive libraries and frameworks offer 
advanced capabilities for experienced developers. This course introduces undergraduate students to 
the fundamentals of Python, focusing on core concepts such as variables, control structures, data 
types, and functions. By the end of the course, students will be equipped with the skills needed to 
write efficient Python programs and apply them to solve real-world problems across various 
domains`,
            fileName: "Cloud Computing.pdf",
            isLoaded: true
        },
        pythonProgramming: {
            text: ``,
            fileName: "Python Programming.pdf",
            isLoaded: true
        },
        cProgramming: {
            text: `.E. in Computer Science and Engineering 
Choice Based Credit System (CBCS) applicable for 2024 Scheme 
SEMESTER – I / II 
Principles of Programming Using C (2:0:2) 3 
(Effective from the academic year 2024-25) 
Course Code BPOP13/23 CIE Marks 50 
Teaching Hours/Week (L:T:P) 2:0:2 SEE Marks 50 
Total Number of Contact 
Hours 
26 hours of theory 
+ 
14 hours of Practical 
Exam Hours 3 
Course Objectives: 
This course will enable students to: 
● Gain proficiency in the syntax and semantics of the C programming language. 
● Understand the structure and components of a C program, including functions, data 
types, operators, and control & Looping structures. 
● Learn to analyse problems, design algorithms, and implement solutions using C. 
● Apply C programming skills to real-world problems and projects`,
            fileName: "C Programming.pdf",
            isLoaded: true
        },
        pythonImportantQuestions: {
            text: `Python Programming Important Questions and Answers
Unit 1: Introduction to Python
----------
Q1. What are the key features of Python?
A: • Easy to learn and read
   • Interpreted language
   • Dynamically typed
   • Object-oriented
   • Large standard library
   • Platform independent

Q2. Explain Python's memory management
A: Python uses automatic memory management with:
   • Garbage collection
   • Reference counting
   • Memory pooling

// ADD MORE QUESTIONS HERE
// Format:
// Q<number>. <question>
// A: <detailed answer>
// 
// Organize by units/topics
// Include code examples where relevant
// Add multiple choice questions if needed
// Add programming problems with solutions

Unit 2: Control Structures
----------
// ADD QUESTIONS HERE

Unit 3: Functions and Modules
----------
// ADD QUESTIONS HERE

Unit 4: Object-Oriented Programming
----------
// ADD QUESTIONS HERE

Unit 5: File Handling and Exception Handling
----------
// ADD QUESTIONS HERE`,
            fileName: "Python Important Questions.pdf",
            isLoaded: true
        }
    };

    let userMessage = {
        text: null,
        image: null,
    };

    // Function to get lab program response
    function getLabProgramResponse(userText) {
        userText = userText.toLowerCase().trim();
    
        if (userText.includes("pop lab program") || userText.includes("lab programs pop")) {
            return "Here are the available lab programs:<br>" +
                Object.keys(labPrograms)
                    .map(key => `- <b>${key}</b> (${labPrograms[key].category}): ${labPrograms[key].description}`)
                    .join("<br>");
                    
        }
        if (userText.includes("pop important questions") || userText.includes("pop imp")) {
            return "Here are the questions:<br>" +
                Object.keys(popq)
                    .map(key => `- <b>${key}</b> (${popq[key].category}): ${popq[key].description}`)
                    .join("<br>");
                    
        }
        if (userText.includes("abcd") || userText.includes("python questions")) {
            return "Here are the available questions:<br>" +
                Object.keys(pythonq2)
                    .map(key => `- <b>${key}</b> (${pythonq2[key].category}): ${pythonq2[key].description}`)
                    .join("<br>");
        }
        if (userText.includes("python lab program") || userText.includes("lab programs python")) {
            return "Here are the available lab programs:<br>" +
                Object.keys(lab2)
                    .map(key => `- <b>${key}</b> (${lab2[key].category}): ${lab2[key].description}`)
                    .join("<br>");
        }
        if (userText.includes("python important questions") || userText.includes("important python questions")) {
            return "Here are the important questions:<br>" +
                Object.keys(pythonq)
                    .map(key => `- <b>${key}</b> (${pythonq[key].category}): ${pythonq[key].description}`)
                    .join("<br>");
        }
        for (let key in labPrograms) {
            let keywords = key.split(" ");
            if (keywords.some(word => userText.includes(word))) {
                return `📘 <b>${labPrograms[key].category}</b>: ${labPrograms[key].description}`;
            }
        }
        for (let key in popq) {
            let keywords = key.split(" ");
            if (keywords.some(word => userText.includes(word))) {
                return `📘 <b>${popq[key].category}</b>: ${popq[key].description}`;
            }
        }
        for (let key in pythonq2) {
            let keywords = key.split(" ");
            if (keywords.some(word => userText.includes(word))) {
                return `📘 <b>${pythonq2[key].category}</b>: ${pythonq2[key].description}`;
            }
        }
        for (let key in pythonq) {
            let keywords = key.split(" ");
            if (keywords.some(word => userText.includes(word))) {
                return `📘 <b>${pythonq[key].category}</b>: ${pythonq[key].description}`;
            }
        }
        for (let key in lab2) {
            let keywords = key.split(" ");
            if (keywords.some(word => userText.includes(word))) {
                return `📘 <b>${lab2[key].category}</b>: ${lab2[key].description}`;
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

    // Function to get calendar response
    function getCalendarResponse(userText) {
        userText = userText.toLowerCase().trim();

        if (userText.includes('holiday') || 
            userText.includes('future events') || 
            userText.includes('calendar') || 
            userText.includes('upcoming dates')) {
            
            let response = "🗓️ <b>Upcoming BMSIT Events and Holidays:</b><br>";
            
            if (userText.includes('holiday')) {
                response += holidays.length > 0 
                    ? holidays.join("<br>") 
                    : "No specific holidays found in the current calendar.";
            } else {
                response += calendarEvents
                    .map(event => `• ${event.event} on ${event.date}`)
                    .join("<br>");
            }
            
            return response;
        }

        return null;
    }

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
            case "health":
                rolePrefix = "As your mental and emotional health support ";
                persona = "";
                break;
            default:
                rolePrefix = "As a helpful assistant, ";
                persona = "";
        }

        return { rolePrefix, persona };
    }

    // Update the PDF query handler section in your generateResponse function
    const pdfQueryHandlers = [
        {
            pdfs: [pdfContents.pythonImportantQuestions],
            keywords: ["python important", "python questions", "python exam", "python practice"],
            handler: (userText) => {
                const content = pdfContents.pythonImportantQuestions.text;
                const converter = new showdown.Converter({
                    tables: true,
                    strikethrough: true,
                    tasklists: true,
                    emoji: true
                });

                // Format the response with markdown
                let response = `# Python Important Questions

${content}

> Note: Study these questions thoroughly for your exam preparation.`;

                return converter.makeHtml(response);
            }
        }
    ];

    // Update the generateResponse function to use the handler
    async function generateResponse(aiChatBox) {
        let textElement = aiChatBox.querySelector(".ai-chat-area");
        let { rolePrefix, persona } = getRolePersona(userMessage.text);
        
        // Check calendar events first
        const calendarResponse = getCalendarResponse(userMessage.text);
        if (calendarResponse) {
            textElement.innerHTML = calendarResponse;
            return;
        }
        
        // Check if this is a lab program query first
        if (userMessage.text.toLowerCase().includes("lab program") || 
            userMessage.text.toLowerCase().includes("pop lab")) {
            const labResponse = getLabProgramResponse(userMessage.text);
            textElement.innerHTML = labResponse;
            return;
        }
        //check for python questions
        if (userMessage.text.toLowerCase().includes("python questions") || 
            userMessage.text.toLowerCase().includes("python important")) {
            const labResponse = getLabProgramResponse(userMessage.text);
            textElement.innerHTML = labResponse;
            return;
        }
        if (userMessage.text.toLowerCase().includes("pop important ") || 
            userMessage.text.toLowerCase().includes("pop questions")) {
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
        
        // Check PDF-specific queries
        const pdfQueryHandlers = [
            {
                pdfs: [pdfContents.cloudComputing],
                keywords: ["cloud computing", "cloud", "delivery models", "infrastructure"],
                message: "Based on the Cloud Computing course document"
            },
            {
                pdfs: [pdfContents.pythonProgramming],
                keywords: ["python", "programming", "object oriented", "modular"],
                message: "Based on the Python Programming course document"
            },
            {
                pdfs: [pdfContents.cProgramming],
                keywords: ["c programming", "syntax", "algorithms", "control structures"],
                message: "Based on the C Programming course document"
            },
            {
                pdfs: [pdfContents.pythonImportantQuestions],
                keywords: ["python important", "python questions", "python exam", "python practice"],
                message: "Based on the Python Important Questions document"
            },
            {
                pdfs: [pdfContents.pythonImportantQuestions],
                keywords: ["python questions", "python important", "python exam", "python practice", "python mcq", "python test"],
                message: "Here are the Python Important Questions and Answers:\n\n"
            }
        ];

        // Check if query matches any PDF's context
        const matchedPDFHandler = pdfQueryHandlers.find(handler => 
            handler.keywords.some(keyword => 
                userMessage.text.toLowerCase().includes(keyword)
            )
        );

        if (matchedPDFHandler) {
            // Add PDF context to the prompt
            userMessage.text = `${matchedPDFHandler.message}, ${userMessage.text}\n\nPDF CONTENT:\n${matchedPDFHandler.pdfs[0].text.substring(0, 15000)}`;
        }
        
        // Add language instruction to the prompt
        const languageInstruction = `Please respond in ${langName} language: `;
        
        let requestBody = {
            contents: [{ 
                parts: [{ 
                    text: languageInstruction + rolePrefix + userMessage.text 
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

    // PDF upload function with multi-document support
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
            
            // Dynamically add PDF to pdfContents based on file name
            const fileName = file.name.toLowerCase();
            if (fileName.includes("cloud")) {
                pdfContents.cloudComputing = {
                    text: fullText.trim(),
                    fileName: file.name,
                    isLoaded: true
                };
            } else if (fileName.includes("python")) {
                pdfContents.pythonProgramming = {
                    text: fullText.trim(),
                    fileName: file.name,
                    isLoaded: true
                };
            } else if (fileName.includes("c ") || fileName.includes("programming")) {
                pdfContents.cProgramming = {
                    text: fullText.trim(),
                    fileName: file.name,
                    isLoaded: true
                };
            }
            
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
            // Reset specific PDF content based on file name
            const resetPDF = (pdfKey) => {
                pdfContents[pdfKey] = {
                    text: "",
                    fileName: "",
                    isLoaded: false
                };
            };

            if (fileName.includes("cloud")) {
                resetPDF('cloudComputing');
            } else if (fileName.includes("python")) {
                resetPDF('pythonProgramming');
            } else if (fileName.includes("c ") || fileName.includes("programming")) {
                resetPDF('cProgramming');
            }

            uploadedPDFs.innerHTML = "";
        });
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

    // PDF upload event listeners
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
