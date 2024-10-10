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


const dropdownContainer = document.querySelector('.dropdown-container');
const dropdownButton = document.querySelector('.dropdown-button');
const lightModeLink = document.getElementById('lightMode');
const darkModeLink = document.getElementById('darkMode');
const body = document.body;

// Simulated feature flag stored in localStorage
localStorage.setItem('darkModeFeature', 'enabled');  // Simulate enabling/disabling feature

// Check if dark mode feature is enabled
const isDarkModeFeatureEnabled = localStorage.getItem('darkModeFeature') === 'enabled';

// Toggle dropdown visibility
dropdownButton.addEventListener('click', () => {
  dropdownContainer.classList.toggle('active');
});

// Only show Dark Mode option if feature is enabled
if (isDarkModeFeatureEnabled) {
  darkModeLink.style.display = 'block';
} else {
  darkModeLink.style.display = 'none'; // Hide Dark Mode option if feature is disabled
}

// Light mode toggle
lightModeLink.addEventListener('click', (event) => {
  event.preventDefault();
  body.classList.remove('dark-mode');
  localStorage.setItem('theme', 'light');
});

// Dark mode toggle (only if the feature is enabled)
darkModeLink.addEventListener('click', (event) => {
  if (isDarkModeFeatureEnabled) {
    event.preventDefault();
    body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
    console.log('Theme changed to Dark Mode');
  } else {
   alert('Dark Mode feature is not available');
  }
});

// Apply saved theme on page load
if (localStorage.getItem('theme') === 'dark' && isDarkModeFeatureEnabled) {
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

  const sentEmails = new Set();

  const contactForm = document.getElementById('contactForm');
  const emailInput = document.getElementById('emailInput');
  const errorMessage = document.getElementById('error-message');

  contactForm.addEventListener('submit', (event) => {
    const email = emailInput.value;
  if (sentEmails.has(email)) {
    event.preventDefault(); // Prevent form submission
    errorMessage.textContent = `Email has already been sent to ${email}`;
    errorMessage.style.color = '#B80000';
    errorMessage.style.fontWeight = 'bold';
  } else if (emailInput.validity.valid) {
    // If the email is valid and hasn't been sent, submit the form and add the email to the set
    sentEmails.add(email);
    alert('Message sent!');  
  } else {
    event.preventDefault(); // Prevent form submission if email is invalid
    errorMessage.textContent = 'Please enter a valid email address';
  }
});


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
const navLinks = document.querySelectorAll('#nav-menu li a');

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


var typed = new Typed ('.span__ri', {
  strings: ["First sentence.", "Second sentence."],
  typeSpeed: 50,
  backSpeed: 50,
  loop: true
});


function reactiveProgramming () {
  const { fromEvent } = rxjs;
const { map } = rxjs.operators;

const visitorCountUpdates = new rxjs.Observable(observer => {
  let count = 0;
  setInterval(() => {
    count += Math.floor(Math.random() * 10); // Simulate new visitors
    observer.next(count); // Push updated visitor count
  }, 2000);
});

// Subscribe to the observable to update the UI
visitorCountUpdates.subscribe(count => {
  document.getElementById('visitorCount').innerText = count;
});
}
reactiveProgramming ()


  const commentForm = document.getElementById('commentForm');
  const commentsSection = document.getElementById('commentsSection');
  const savedComments = JSON.parse(localStorage.getItem('comments')) || [];

  // Load saved comments from localStorage
  function loadComments() {
    commentsSection.innerHTML = '<h3>Comments:</h3>';
    savedComments.forEach(comment => {
      const commentElement = document.createElement('p');
      commentElement.innerText = comment;
      commentsSection.appendChild(commentElement);
    });
  }

  // Save comments to localStorage
  function saveComments() {
    localStorage.setItem('comments', JSON.stringify(savedComments));
  }

  // Handle form submission
  commentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const commentText = document.getElementById('commentText').value;
    
    if (commentText.trim()) {
      // Add the comment to the saved comments array
      savedComments.push(commentText);
      saveComments();

      // Add the new comment to the UI
      const newComment = document.createElement('p');
      newComment.innerText = commentText;
      commentsSection.appendChild(newComment);
      
      // Clear the form
      commentForm.reset();
    }
  });

  // Initialize
  loadComments();


 // Validate if the command starts with "Chatbot"
 function isValidCommand(command) {
  const regex = /^chatbot/i; // Must start with "Chatbot"
  return regex.test(command);
}

  //Remove placeholder emoji in the form of emoji 


  function removeEmoji(text) {
    const emojiRegex = /emoji\d+/g; // Match placeholder emoji patterns
    return text.replace(emojiRegex, '');
  }


  // Validate phone number in the format "(+###) ###-###-###"
  const phoneNumber = document.getElementById('phoneNumber');
  phoneNumber.addEventListener("click", checkPhoneNumber);
    function checkPhoneNumber(phoneNumber) {
      const regex = /^\(\+\d{3}\) \d{2}-\d{3}-\d{3}$/;
      if (regex.test(phoneNumber)) {
        return "Thanks! You can now download me to your phone.";
      } else {
        return `Oops, it seems like I can't reach out to ${phoneNumber}`;
      }
    }

    const fullName = document.getElementById('fullName')
    function niceToMeetYou(fullName) {
      return fullName.replace(/(\w+),\s*(\w+)/, "Nice to meet you, $2 $1");
    }


  // Validate phone number in the format "(+###) ###-###-###"
    function checkPhoneNumber(phoneNumber) {
      const regex = /^\(\+\d{3}\) \d{2}-\d{3}-\d{3}$/;
      if (regex.test(phoneNumber)) {
        return "Thanks! You can now download me to your phone.";
      } else {
        return `Oops, it seems like I can't reach out to ${phoneNumber}`;
      }
    }
    
   