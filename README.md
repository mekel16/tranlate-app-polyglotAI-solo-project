# Solo Project Translator Using Open AI API

---

<img src="https://github.com/mekel16/tranlate-app-polyglotAI-solo-project/blob/main/core%20requierment.jpeg" alt="description" width="300" height="300">

---

this is my first project in AI engineering. haha, looks simple but I try my best for this one. 😁👌

> ** This project focuses on using the OpenAI API. If we want to deploy it, the API must be stored securely (it can't be seen and must stay private) every time there is a request to the API **

---

## 🛠️ Tools I Use

<p align="left">
  <img src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Cloudflare_Logo.svg" alt="Cloudflare" height="80"/>
  <img src="https://github.com/user-attachments/assets/aa54bc3b-450f-465e-bf70-af2f0ba730c5" alt="VSCode" width="80"/>
  <img src="https://github.com/user-attachments/assets/be492517-5242-4510-80cf-5d6a9d01f51b" alt="OpenAI" width="80"/>
  <img src="https://github.com/user-attachments/assets/55396916-fc02-4fe5-997a-1c852825d931" alt="HTML5" width="80"/>
  <img src="https://github.com/user-attachments/assets/e1d32508-dba0-4578-86ff-5ae02377920a" alt="JavaScript" width="80"/>
</p>

---

## ✨ Preview

- 🔗 [Live Demo](https://mich-translateapp-solo-project-polyglot.pages.dev/)  
- 📦 [GitHub Repo](https://github.com/mekel16/polyglotAI-solo-Project)

---

## 📑 Table of Content

1. [✨ Preview](#-preview)
2. [🚀 Project Goals](#-project-goals)
3. [🛠️ Key Feature](#-key-feature)
4. [🧪 Technology Used](#-technology-used)
5. [📚 Main Learning](#-main-learning)
6. [🖼️ Screenshots](#-screenshots)
7. [📄 JavaScript `script.js` Documentation PolyglotAI](#-javascript-scriptjs-documentation-polyglotai)
8. [Documentation: Cloudflare Worker `index.js` for Translator App](#documentation-cloudflare-worker-indexjs-for-translator-app)
9. [🡩‍💻 Author](#author)

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

### 🔒 Security Notes

- API key is never on frontend; request only goes to backend.
- Backend is fully responsible to keep secret and call OpenAI API.

---

### ✅ Conclusion for `script.js`

This JavaScript code is the client-side logic for an AI-based translator app. It makes sure user interaction is smooth, input is validated, and all translation requests go securely to the backend, so the API key is never exposed in the frontend.

---

## Documentation: Cloudflare Worker `index.js` for Translator App

This file is the main backend code for the translator app. It is written for deployment on Cloudflare Workers and connects to the OpenAI API for translating Indonesian text to Japanese, French, or Spanish.

---

### 1. Import & Allowed Languages

```javascript
import OpenAI from "openai";

const ALLOWED_LANGUAGES = {
  japan: "Japanese",
  french: "French",
  spain: "Spanish"
};
```
- We import the OpenAI library.
- We define which languages are allowed for translation (Japanese, French, and Spanish).
- The keys (`japan`, `french`, `spain`) are used on the frontend, and their values are the actual language names for OpenAI.

---

### 2. CORS Headers

```javascript
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};
```
- These headers are for CORS (Cross-Origin Resource Sharing).
- They allow requests from anywhere and let the browser send POST or OPTIONS requests with JSON.

---

### 3. Export Default: The Worker Handler

```javascript
export default {
  async fetch(request, env, ctx) {
    ...
  }
};
```
- The Worker exposes a `fetch` function that handles HTTP requests.
- This is the entry point for every request to the Worker.

---

### 4. Handle OPTIONS Method (For CORS Preflight)

```javascript
if (request.method === "OPTIONS") {
  return new Response(null, { headers: corsHeaders });
}
```
- If the browser sends an OPTIONS request (for CORS check), we respond with allowed headers.

---

### 5. Only Allow POST Requests

```javascript
if (request.method !== "POST") {
  return new Response("Method Not Allowed", { status: 405, headers: corsHeaders });
}
```
- Only POST requests are allowed (for translation).
- Other HTTP methods will get a 405 error.

---

### 6. Parse JSON Body

```javascript
let reqBody;
try {
  reqBody = await request.json();
} catch (e) {
  return new Response(JSON.stringify({ error: "Invalid JSON" }), {
    status: 400,
    headers: { ...corsHeaders, "Content-Type": "application/json" }
  });
}
```
- Try to parse the request body as JSON.
- If parsing fails, return an error.

---

### 7. Validate Input

```javascript
const { text, target } = reqBody;
if (
  typeof text !== "string" ||
  !text.trim() ||
  typeof target !== "string" ||
  !(target in ALLOWED_LANGUAGES)
) {
  return new Response(JSON.stringify({ error: "Invalid input" }), {
    status: 400,
    headers: { ...corsHeaders, "Content-Type": "application/json" }
  });
}
```
- Check that `text` and `target` are strings.
- Make sure `text` is not empty and `target` is one of the allowed languages.
- If not, return an error.

---

### 8. Build the Prompt and Messages

```javascript
const prompt = `Translate the following indonesian text to ${ALLOWED_LANGUAGES[target]}:`;

const messages = [
  { role: "system", content: prompt },
  { role: "user", content: text }
];
```
- Build a prompt for the AI to translate from Indonesian to the target language.
- Format the messages for the OpenAI chat completion endpoint.

---

### 9. Create OpenAI Instance

```javascript
const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
  baseURL: 'url gatewai cloudflare'
});
```
- Create an OpenAI API instance.
- Get the API key from the Worker environment (`env`).
- The `baseURL` can be set to a proxy/gateway if needed.

---

### 10. Call the OpenAI API

```javascript
const chatCompletion = await openai.chat.completions.create({
  model: 'gpt-4o-mini',
  messages,
  temperature: 1.0,
  presence_penalty: 0,
  frequency_penalty: 0
});
```
- Make a call to OpenAI's chat completions endpoint.
- Use the `gpt-4o-mini` model for translation.
- Pass all the formatted messages and set parameters for creativity and repetition.

---

### 11. Return the Result

```javascript
return new Response(JSON.stringify({
  choices: chatCompletion.choices
}), {
  headers: {
    ...corsHeaders,
    'Content-Type': 'application/json'
  }
});
```
- Return the AI's response as JSON, including CORS and content type headers.

---

### 12. Error Handling

```javascript
} catch (e) {
  return new Response(
    JSON.stringify({ error: e.message || String(e) }),
    {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      },
      status: 500
    }
  );
}
```
- If something goes wrong with the OpenAI call, catch the error and return it as JSON with status 500.

---

### Summary

- This code receives Indonesian text and a target language, checks the input, and sends a translation request to OpenAI.
- It handles CORS, errors, and only allows POST requests.
- The translation is done securely on the backend, so the OpenAI API key is never exposed to the frontend.

The code is the backend code for my translator app. This backend is responsible for keeping the OpenAI API key and the prompt safe in the Cloudflare environment (server side). The API key is stored securely, so it is never visible in the frontend or to users. All requests for translation are handled by this backend, so only the backend can access the OpenAI API directly.

---

### ✅ Conclusion for `index.js`

The backend code (`index.js`) is responsible for all translation processing and for keeping the OpenAI API key safe inside the Cloudflare environment. It makes sure that only the backend can access the API key and talk to the OpenAI API, so your secret key never ends up in the frontend or with the user. This is a secure way to use AI APIs in a web app.

---

## 🡩‍💻 Author

**Michael Pallea**

- 🔗 [Portfolio](https://mekel16.github.io/michael_portofolio_website/)  
- 📧 Email: [mekelpallea@gmail.com](mailto:mekelpallea@gmail.com)

---
