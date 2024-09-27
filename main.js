
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
window.doGTranslate = function(langPair, event) {
  if (event) {
      event.preventDefault(); 
      event.stopPropagation(); 
  }

  console.log('doGTranslate called with:', langPair); // Debug log
  if (langPair === '') return;

  var lang = langPair.split('|')[1];
 
   // Check for select element, retry if not found
   var checkSelectElement = function(retries) {
    var select = document.querySelector('select.goog-te-combo');
    console.log('Checking for select element. Attempts remaining:', retries); // Debug log
    if (select) {
        console.log('Select element found:', select); // Debug log
        select.value = lang;
        select.dispatchEvent(new Event('change'));
    } else if (retries > 0) {
        setTimeout(function() {
            checkSelectElement(retries - 1);
        }, 100); // Check every 100ms
    } else {
        console.error('Google Translate select element not found after retries.');
    }
};

checkSelectElement(10);
};

window.googleTranslateElementInit = function() {
  new google.translate.TranslateElement({
      pageLanguage: 'en',
      includedLanguages: 'en,fr',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  }, 'google_translate_element');
}


 // JavaScript for theme toggle 
 const dropdownContainer = document.querySelector('.dropdown-container');
 const dropdownButton = document.querySelector('.dropdown-button');
 const lightModeLink = document.getElementById('lightMode');
 const darkModeLink = document.getElementById('darkMode');
 const body = document.body;
 
 // Toggle dropdown visibility
 dropdownButton.addEventListener('click', () => {
     dropdownContainer.classList.toggle('active');
    
 });
 
 // Change theme to light mode
 lightModeLink.addEventListener('click', (event) => {
     event.preventDefault(); 
     body.classList.remove('dark-mode'); 
     localStorage.setItem('theme', 'light'); 
 
 });
 
 // Change theme to dark mode
 darkModeLink.addEventListener('click', (event) => {
     event.preventDefault(); 
     body.classList.add('dark-mode'); 
     localStorage.setItem('theme', 'dark'); 
     console.log('Theme changed to Dark Mode');
 });
 
 // Apply saved theme on page load
 if (localStorage.getItem('theme') === 'dark') {
     body.classList.add('dark-mode');
 } else {
     body.classList.remove('dark-mode'); 
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

