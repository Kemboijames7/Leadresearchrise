document.addEventListener('keydown', function(e) {
    // Tab key: Focus on the next interactive element
    if (e.key === 'Tab') {
        const focusedElement = document.activeElement;
        const focusableElements = document.querySelectorAll('input, textarea, button');
        const index = Array.prototype.indexOf.call(focusableElements, focusedElement);
        
        if (index > -1) {
            const nextElement = focusableElements[index + 1] || focusableElements[0]; // Loop to first element
            nextElement.focus();
            e.preventDefault(); // Prevent default tab behavior if needed
        }
    }

    // Enter key: Submit form or trigger button click
    else if (e.key === 'Enter') {
        const focusedElement = document.activeElement;
        
        // If focused on an input or textarea, submit the form
        if (focusedElement.tagName === 'INPUT' || focusedElement.tagName === 'TEXTAREA') {
            const form = focusedElement.closest('form');
            if (form) {
                form.submit();
            }
        }
        
        // If focused on a button, trigger a click event
        else if (focusedElement.tagName === 'BUTTON') {
            focusedElement.click();
        }
    }
});



 
const scrollRevealOption = {
    distance: "50px",
    origin: "bottom",
    duration:700,
};

const sr = ScrollReveal();

// Apply the reveal effect
sr.reveal(".et_pb_image_wrap", {
    ...scrollRevealOption,
    delay: 300
});


ScrollReveal().reveal(".et_pb_image_wrap", {
    ...scrollRevealOption,
    interval: 200,
  });


// Define functions in the global scope
window.doLingvaTranslate = async function(langPair, event) {
    console.log('Language pair clicked:', langPair);
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    console.log('doLingvaTranslate called with:', langPair); // Debug log
    if (langPair === '') return;

    var [sourceLang, targetLang] = langPair.split('|');

    // Fetch the translation for the whole document content
    var textToTranslate = document.body.innerText; // Adjust this if you need to translate only specific content

    try {
        // Call the Lingva Translate API
        const response = await fetch(`https://lingva.ml/api/v1/${sourceLang}/${targetLang}/${encodeURIComponent(textToTranslate)}`);

        if (!response.ok) {
            throw new Error(`Translation request failed with status ${response.status}`);
        }

        const data = await response.json();
        const translatedText = data.translation;

        // Replace the body text with the translated content
        document.body.innerText = translatedText; // You may want to replace only certain parts of the page

        console.log('Translation successful:', translatedText); // Debug log
    } catch (error) {
        console.error('Error during translation:', error);
    }
};



// Function to initialize your own translation interface, if needed
window.customTranslateElementInit = function() {
    // Example: Creating buttons for language switching
    const enButton = document.createElement('button');
    enButton.innerText = 'English';
    enButton.onclick = (e) => window.doLingvaTranslate('fr|en', e); // Translate from French to English

    const frButton = document.createElement('button');
    frButton.innerText = 'Français';
    frButton.onclick = (e) => window.doLingvaTranslate('en|fr', e); // Translate from English to French

    document.body.appendChild(enButton);
    document.body.appendChild(frButton);
}

// Call this function once the page loads
window.onload = function() {
    window.customTranslateElementInit();
};


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
 
//Lazy Loading Code

const lazyImages = document.querySelectorAll('img[data-src]');
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(image => observer.observe(image));





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


  const scrollTopButton = document.querySelector('.scroll_top');

  window.addEventListener('scroll', () => {
    // Get the total height of the document and the height of the viewport
    const totalHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;

    const showButtonAt = totalHeight * 0.25;

    if (window.scrollY > showButtonAt) {
        scrollTopButton.style.display = 'block';  
    } else {
        scrollTopButton.style.display = 'none';   
    }
});

 
scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth' 
        
    });
});


const sections = document.querySelectorAll('.choice'); 
const navLinks = document.querySelectorAll('#nav-menu li'); 

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    // Use window.scrollY instead of pageYOffset
    if (window.scrollY >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});
