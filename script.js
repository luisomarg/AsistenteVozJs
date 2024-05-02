// Código para el reconocimiento de voz y buscar en diferentes motores de búsqueda
const recognition = new webkitSpeechRecognition();
recognition.lang = "es-ES";
recognition.continuous = true;

// Obtener el elemento select y el botón de guardar
const searchEngineSelect = document.getElementById('search-engine');
const saveSettingsButton = document.getElementById('save-settings');

// Obtener el motor de búsqueda guardado desde el localStorage
const savedSearchEngine = localStorage.getItem('searchEngine') || 'google';
searchEngineSelect.value = savedSearchEngine;

// Función para guardar el motor de búsqueda seleccionado
saveSettingsButton.addEventListener('click', () => {
  const selectedSearchEngine = searchEngineSelect.value;
  localStorage.setItem('searchEngine', selectedSearchEngine);
});

// Función para obtener la URL de búsqueda según el motor seleccionado
function getSearchURL(query) {
  const searchEngine = localStorage.getItem('searchEngine') || 'google';
  let searchURL;

  switch (searchEngine) {
    case 'google':
      searchURL = `https://www.google.com/search?q=${query}`;
      break;
    case 'bing':
      searchURL = `https://www.bing.com/search?q=${query}`;
      break;
    case 'duckduckgo':
      searchURL = `https://duckduckgo.com/?q=${query}`;
      break;
    case 'startpage':
      searchURL = `https://www.startpage.com/do/search?q=${query}`;
      break;
    default:
      searchURL = `https://www.google.com/search?q=${query}`;
  }

  return searchURL;
}

recognition.onresult = (event) => {
  const speechToText = event.results[0][0].transcript;
  let searchQuery = speechToText;

  // Verificar si el usuario mencionó "busca" o "buscar en" seguido del nombre del navegador
  const searchEngineRegex = /busca(r)?\s*en\s*(google|bing|duckduckgo|startpage)\s*(.*)/i;
  const match = searchQuery.match(searchEngineRegex);

  if (match) {
    const requestedSearchEngine = match[2].toLowerCase();
    const query = match[3].trim();
    searchQuery = query;

    // Guardar el motor de búsqueda solicitado en el localStorage
    localStorage.setItem('searchEngine', requestedSearchEngine);
  }

  const searchURL = getSearchURL(searchQuery);
  window.open(searchURL, "_blank");

  document.getElementById("speechText").textContent = searchQuery;
};

function stopRecognition() {
  recognition.stop();
}