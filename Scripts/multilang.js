async function loadLanguages() {
    const response = await fetch(`https://translate.googleapis.com/translate_a/l?client=gtx`)
    const data = await response.json()
    console.log(data)

    Object.entries(data.tl).forEach(([code, name]) => {
        let option = document.createElement('option')
        option.value = code
        option.textContent = name
        languageSelector.appendChild(option)
    })
}

loadLanguages()

languageSelector.addEventListener("change", async function () {
    let selectedLang = this.value;
    let translatableElements = document.querySelectorAll("[data-translate]");

    let originalTexts = Array.from(translatableElements).map(el => el.innerText);
    console.log(originalTexts)
    let joinedText = originalTexts.join(" ||| ");

    translatableElements.forEach(el => el.setAttribute("data-loading", "true"));

    try {
        let translatedText = await translateText(joinedText, selectedLang);
        console.log(translatedText)

        let translatedParts = translatedText.split(" ||| ");
        translatableElements.forEach((el, index) => {
            el.innerText = translatedParts[index] || originalTexts[index];
        });

    } catch (error) {
        console.error("Translation Error:", error);
    } finally {
        
        translatableElements.forEach(el => el.removeAttribute("data-loading"));
    }
});

async function translateText(text, targetLang) {
    try {
        let response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`);
        let data = await response.json();

        return data[0].map(item => item[0]).join(" ");
    } catch (error) {
        console.error("Translation API Error:", error);
        return text;
    }
}