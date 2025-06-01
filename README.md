# Solo Project Translator Using Open AI API
---
<img src="https://github.com/mekel16/tranlate-app-polyglotAI-solo-project/blob/main/core%20requierment.jpeg" alt="description" width="300" height="300">
---

this is my first project in AI engineering. haha, looks simple but I try my best for this one. 😁👌

> ** This project focuses on using the OpenAI API. If we want to deploy it, the API must be stored securely (it can't be seen and must stay private) every time there is a request to the API **

Tools I Use:

<p align="left">
  <img src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Cloudflare_Logo.svg" alt="Cloudflare" height="80"/>
  <img src="https://github.com/user-attachments/assets/aa54bc3b-450f-465e-bf70-af2f0ba730c5" alt="VSCode" width="80"/>
  <img src="https://github.com/user-attachments/assets/be492517-5242-4510-80cf-5d6a9d01f51b" alt="OpenAI" width="80"/>
  <img src="https://github.com/user-attachments/assets/55396916-fc02-4fe5-997a-1c852825d931" alt="HTML5" width="80"/>
  <img src="https://github.com/user-attachments/assets/e1d32508-dba0-4578-86ff-5ae02377920a" alt="JavaScript" width="80"/>
</p>

---

## ✨ Preview

🔗 [Live Demo](https://mich-translateapp-solo-project-polyglot.pages.dev/)  
📦 [GitHub Repo](https://github.com/mekel16/polyglotAI-solo-Project)

---

## 📑 Table of Content

1. [✨ Preview](#-preview)
2. [🚀 Project Goals](#-project-goalas)
3. [🛠️ Key Feature](#-key-feature)
4. [🧪 Tools used](#-technology-used)
5. [📚 Key Learning](#-main-learning)
6. [📄`script.js` documentation](#-javascript-scriptjs-documentation-polyglotai)
7. [📄 `index.js` documentation](#-workers-backend-indexjs-documentation)
8. [✅ conclusion](#-conclusion)

---

## 🚀 Project Goals

* Learn how to use API and deploy API securely with Cloudflare Workers.
* Protect sensitive information like API key.
* Apply some technical concepts from the OpenAI API side such as: *dependencies*, *requests*, *models*, *messages array*, and *tokens*.
* Try to use **Prompt Engineering** to make better AI model output.

---

## 🛠️ Key Feature

* 🔐 **Secure Deployment**  
  Using environment variables & server-side logic to keep the API Key secret.

* 🧠 **Structured OpenAI API Usage**
  * **Dependencies**: Install the needed libraries
  * **Request Structure**: How to make a request to the model
  * **Models**: Use the `gpt-4o-mini` model
  * **Messages Array**: The dialog format (`system`, `user`, `assistant`)
  * **Token Handling**: Handle the token limit in the request

* 🎯 **Prompt Engineering Implementation**
  * **Temperature**: Control the model's creativity
  * **Few-shot Approach**: Give some examples in the prompt for more relevant result
  * **Stop Sequences**: Stop the output at a certain point
  * **Presence & Frequency Penalty**: Set the diversity and repetition in the result

---

## 🧪 Technology Used

* **Frontend**: HTML, CSS, JavaScript
* **Backend**: JavaScript and Cloudflare (database)
* **API**: [OpenAI GPT API](https://platform.openai.com/docs)

---

## 📚 Main Learning

✅ Best practice for using API **safely and efficiently**  
✅ Improve my skill in **Prompt Engineering**  
✅ Understand the **structure of communication with LLM** (Large Language Models)  
✅ Build an AI app that is ready for *production*

---

## 🖼️ Screenshots

<img src="https://github.com/user-attachments/assets/48817964-555a-456e-a284-bb93ec5edf14" alt="Screenshot" width="500">

---

## 📄 JavaScript `script.js` Documentation PolyglotAI

This documentation explains the function, workflow, and main JavaScript code in PolyglotAI app.

---

### Function Summary

This script is for handling user interaction in the web page, validating input, sending requests to backend for translation, and showing the translation result to the user.

---

### Main Workflow

1. **Wait for Page Ready**
   - The code runs after all the HTML document is fully loaded (`DOMContentLoaded`).
2. **Button Event Listener**
   - Listen to click event on the "Translate" button.
3. **Input Validation**
   - Check if the text is filled and target language selected.
   - Only allow languages: `japan`, `french`, `spain`.
4. **Send Request to Backend**
   - Send the text and target language to backend (Cloudflare Worker) with `POST` method.
5. **Show Result**
   - If success, show the translation result.
   - If failed, show error message.

---

### Explanation of Each Code Part

#### 1. DOM Component Initialization

```javascript
const translateBtn = document.getElementById("translateBtn");
const resultBox = document.getElementById("resultBox");
```
- Get the translate button and result box element from the HTML page.

---

#### 2. Event Listener for Translate Button

```javascript
translateBtn.addEventListener("click", async () => {
  // The translation process runs here
});
```
- When user clicks the "Translate" button, an async function runs.

---

#### 3. Get User Input and Validation

```javascript
const textInput = document.getElementById("text");
const text = textInput ? textInput.value : "";
const languageRadios = document.getElementsByName("language");
let selectedLanguage = null;

// Check if text is filled
if (typeof text !== "string" || !text.trim()) {
  alert("Please enter some text.");
  return;
}

// Find the selected language
for (let radio of languageRadios) {
  if (radio.checked) {
    selectedLanguage = radio.value;
    break;
  }
}
if (!selectedLanguage) {
  alert("Please select a language.");
  return;
}

const allowedTargets = ['japan', 'french', 'spain'];
if (!allowedTargets.includes(selectedLanguage)) {
  alert("Invalid language selected.");
  return;
}
```
- Check the text input and chosen language.
- If not valid, show alert and stop the process.

---

#### 4. Send Request to Backend

```javascript
try {
  const url = "url worker";

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: text,
      target: selectedLanguage
    })
  });

  const data = await response.json();
  // Response handling below
```
- Send a POST request to backend with text and target language as payload.

---

#### 5. Response Handling & Error Handling

```javascript
  if (data.error) {
    resultBox.innerText = "Error: " + data.error;
  } else if (data.choices && data.choices[0]?.message?.content) {
    const translatedText = data.choices[0].message.content;
    resultBox.innerText = translatedText;
  } else {
    resultBox.innerText = "Unexpected response format.";
  }
  resultBox.style.display = "block";
} catch (error) {
  console.error("Translation failed:", error);
  resultBox.innerText = "Something went wrong during translation.";
  resultBox.style.display = "block";
}
```
- If backend responds with error, show the error.
- If there is translation result, show the result.
- If response format is not as expected, show error message.
- If an error happens in fetch process, show general error message.

---

## 🔒 Security Notes

- API key is never on frontend; request only goes to backend.
- Backend is fully responsible to keep secret and call OpenAI API.

---

## ✅ Conclusion

This JavaScript code is the client-side logic for an AI-based translator app that is safe, makes sure user interaction is smooth, validates input, and communicates securely with serverless backend.

---

## Workers (backend) index.js documentation

---

## 🡩‍💻 Author

**Michael Pallea**

🔗 [Portfolio](https://mekel16.github.io/michael_portofolio_website/)  
📧 Email: [mekelpallea@gmail.com](mailto:mekelpallea@gmail.com)

---
