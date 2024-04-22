// Codigo para el reconocmiento de voz y buscar en gogole
const recognition = new webkitSpeechRecognition();
recognition.lang = "es-ES";

recognition.onresult = (event) => {
  const speechToText = event.results[0][0].transcript;
  const searchQuery = `https://www.google.com/search?q=${speechToText}`;
  window.open(searchQuery, "_blank");

  document.getElementById("speechText").textContent = speechToText;


};


