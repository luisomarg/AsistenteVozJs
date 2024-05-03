// Obtener el motor de búsqueda seleccionado del localStorage
let searchEngine = localStorage.getItem('searchEngine') || 'google';

// Obtener el idioma seleccionado del localStorage
let language = localStorage.getItem('language') || 'es-ES';

// Código para el reconocimiento de voz y buscar en el motor seleccionado
const recognition = new webkitSpeechRecognition();
recognition.lang = language;
recognition.continuous = true;

recognition.onresult = (event) => {
  const speechToText = event.results[0][0].transcript;
  const searchQuery = `https://www.${searchEngine}.com/search?q=${speechToText}`;
  window.open(searchQuery, "_blank");

  document.getElementById("speechText").textContent = speechToText;
};

function stopRecognition() {
  recognition.stop();
}

// Código para guardar el motor de búsqueda y el idioma seleccionados en el localStorage
if (window.location.pathname.includes('ajustes.html')) {
  const saveSettingsBtn = document.getElementById('save-settings');
  const searchEngineSelect = document.getElementById('search-engine');
  const languageSelect = document.getElementById('language');

  saveSettingsBtn.addEventListener('click', () => {
    const selectedEngine = searchEngineSelect.value;
    const selectedLanguage = languageSelect.value;
    localStorage.setItem('searchEngine', selectedEngine);
    localStorage.setItem('language', selectedLanguage);
    window.location.href = 'index.html'; // Redirigir a index.html después de guardar
  });
}