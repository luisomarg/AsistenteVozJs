// Obtener el motor de búsqueda seleccionado del localStorage
let searchEngine = localStorage.getItem('searchEngine') || 'google';

// Obtener el idioma seleccionado del localStorage
let language = localStorage.getItem('language') || 'es-ES';

// Inicializar el historial de búsquedas
let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

// Código para el reconocimiento de voz y buscar en el motor seleccionado
const recognition = new webkitSpeechRecognition();
recognition.lang = language;
recognition.continuous = true;

recognition.onresult = (event) => {
  const speechToText = event.results[0][0].transcript;
  const searchQuery = `https://www.${searchEngine}.com/search?q=${speechToText}`;
  window.open(searchQuery, "_blank");

  // Agregar la nueva búsqueda al historial
  searchHistory.push({ query: speechToText, url: searchQuery });
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

  // Actualizar el historial en la página
  updateSearchHistory();
};

function stopRecognition() {
  recognition.stop();
}

// Función para actualizar el historial de búsquedas en la página
function updateSearchHistory() {
  const searchHistoryList = document.getElementById('search-history');
  searchHistoryList.innerHTML = '';

  searchHistory.forEach(search => {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    listItem.textContent = `Búsqueda: ${search.query} - URL: ${search.url}`;
    searchHistoryList.appendChild(listItem);
  });
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

// Cargar el historial de búsquedas al cargar la página
window.addEventListener('load', updateSearchHistory);