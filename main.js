
const scrollRevealOption = {
    distance: "50px",
    origin: "bottom",
    duration:1000,
};

const sr = ScrollReveal();

// Apply the reveal effect
sr.reveal(".member", {
    ...scrollRevealOption,
    delay: 500
});

// feature container
ScrollReveal().reveal(".feature__card", {
    ...scrollRevealOption,
    interval: 500,
  });


// Define functions in the global scope
window.doGTranslate = function(langPair) {
  if (langPair === '') return;
  var lang = langPair.split('|')[1];
  var select = document.querySelector('select.goog-te-combo');
  if (select) {
      select.value = lang;
      select.dispatchEvent(new Event('change'));
  }
}

window.googleTranslateElementInit = function() {
  new google.translate.TranslateElement({
      pageLanguage: 'en',
      includedLanguages: 'en,fr',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  }, 'google_translate_element');
}




  function updateTime() {
    const timeElement = document.getElementById('time');
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    timeElement.textContent = `Current Time: ${timeString}`;
  }
  
  // Update time every second
  setInterval(updateTime, 1000);


  const emailInput = document.getElementById('emailInput');
  const errorMessage = document.getElementById('error-message');

  emailInput.addEventListener('input', () =>{
    if (!emailInput.validity.valid) {
        
        errorMessage.textContent = 'Please enter a valid email address';
        errorMessage.style.color = '#B80000';
        errorMessage.style.fontWeight = 'bold';
    } else {
        errorMessage.textContent = '';
    }

  })

