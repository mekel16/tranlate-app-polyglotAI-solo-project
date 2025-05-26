document.addEventListener("DOMContentLoaded", () => {
  const translateBtn = document.getElementById("translateBtn");
  const resultBox = document.getElementById("resultBox");

  translateBtn.addEventListener("click", async () => {
    const textInput = document.getElementById("text");
    const text = textInput ? textInput.value : "";
    const languageRadios = document.getElementsByName("language");
    let selectedLanguage = null;


    if (typeof text !== "string" || !text.trim()) {
      alert("Please enter some text.");
      return;
    }


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

    try {
      const url = "url workerss";

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: text,
          target: selectedLanguage
        })
      });

      const data = await response.json();

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
  });
});
