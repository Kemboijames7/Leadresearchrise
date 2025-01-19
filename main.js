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

//SIGN IN AND REGISTER

// Get the elements
const loginLink = document.getElementById('loginLink');
const loginModal = document.getElementById('loginModal');
const closeBtn = document.getElementById('closeBtn');
const loginForm = document.getElementById('loginFormContent');
const openRegisterFromLogin = document.getElementById('openRegisterFromLogin');

// Show the modal when the login link is clicked
function showModal(modal) {
  modal.style.display = 'block';
}

// Function to close the modal
function closeModal(modal) {
  modal.style.display = 'none';
}

loginLink?.addEventListener('click', function(event) {
  event.preventDefault();
  showModal(loginModal);
});
// Close Login Modal when close button is clicked
closeBtn.addEventListener('click', function() {
  closeModal(loginModal);
});

// Navigate from Login to Register
openRegisterFromLogin?.addEventListener('click', function(event) {
  event.preventDefault();
  closeModal(loginModal);
  showModal(registerModal);
});

// Show Register Modal when register link is clicked
registerLink.addEventListener('click', function (event) {
  event.preventDefault();
  showModal(registerModal);
});

// Close Register Modal when close button is clicked
closeRegisterModal.addEventListener('click', function () {
  closeModal(registerModal);
});

// Navigate from Register to Login
openLoginFromRegister?.addEventListener('click', function (event) {
  event.preventDefault();
  closeModal(registerModal);
  showModal(loginModal);
});

// Handle form submission (optional, if you want to submit the form)
loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from refreshing the page

    // Get the input values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Perform a simple check (you can expand this with more complex validation)
    if (username && password) {
        alert(`Welcome, ${username}! You have successfully logged in.`);
        loginModal.style.display = 'none'; // Hide the modal after login
    } else {
        alert('Please enter both username and password.');
    }
});

// Get modal elements

const forgotPasswordForm = document.getElementById('forgotPasswordForm');
const forgotPasswordMessage = document.getElementById('forgotPasswordMessage');

document.addEventListener('DOMContentLoaded', () => {
  const forgotPasswordModal = document.getElementById('forgotPasswordModal');
  const forgotPasswordLink = document.getElementById('forgotPasswordLink');
  const closeForgotPasswordModal = document.getElementById('closeForgotPasswordModal');

  console.log('forgotPasswordModal:', forgotPasswordModal);
  console.log('forgotPasswordLink:', forgotPasswordLink);
  console.log('closeForgotPasswordModal:', closeForgotPasswordModal);

  if (forgotPasswordModal && forgotPasswordLink && closeForgotPasswordModal) {
      forgotPasswordLink.addEventListener('click', (event) => {
          event.preventDefault();
          console.log('Forgot Password link clicked');
          forgotPasswordModal.style.display = 'block';
      });

      closeForgotPasswordModal.addEventListener('click', () => {
          console.log('Close button clicked');
          forgotPasswordModal.style.display = 'none';
      });
  } else {
      console.error('One or more elements are missing from the DOM.');
  }
});



// Handle "Forgot Password" form submission
forgotPasswordForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('forgotEmail').value;

    try {
        const response = await fetch('/api/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });

        const result = await response.json();
        if (response.ok) {
            forgotPasswordMessage.textContent = result.message || 'Reset code sent to your email.';
            forgotPasswordMessage.style.color = 'green';
        } else {
            forgotPasswordMessage.textContent = result.message || 'An error occurred.';
            forgotPasswordMessage.style.color = 'red';
        }
    } catch (error) {
        console.error('Error:', error);
        forgotPasswordMessage.textContent = 'Something went wrong. Please try again.';
        forgotPasswordMessage.style.color = 'red';
    }
});




 // Checkbox code
 function checkBoxx() {
  const rmCheck = document.getElementById("rememberMe");
  const usernameInput = document.getElementById("username");

  // Load saved username and checkbox state on page load
  if (localStorage.getItem("checkbox") === "true") {
      rmCheck.checked = true; // Set the checkbox as checked
      usernameInput.value = localStorage.getItem("username"); // Load the saved username
      console.log("Loaded saved username and checkbox state");
  } else {
      rmCheck.checked = false;
      usernameInput.value = "";
  }

  // Save state when the checkbox or input changes
  rmCheck.addEventListener("change", saveState);
  usernameInput.addEventListener("input", saveState);

  function saveState() {
      if (rmCheck.checked && usernameInput.value !== "") {
          localStorage.setItem("username", usernameInput.value);
          localStorage.setItem("checkbox", "true");
          console.log("Saved username and checkbox state");
      } else {
          localStorage.removeItem("username");
          localStorage.setItem("checkbox", "false");
          console.log("Cleared username or unchecked checkbox");
      }
  }
}

function handlePasswordValidation() {
  const regPasswordInput = document.getElementById("regPassword");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const passwordError = document.getElementById("passwordError");

  // Attach an input event listener to both password fields
  confirmPasswordInput.addEventListener("input", validatePasswords);
  regPasswordInput.addEventListener("input", validatePasswords);

  function validatePasswords() {
      const password = regPasswordInput.value.trim();
      const confirmPassword = confirmPasswordInput.value.trim();

      if (password !== confirmPassword) {
          passwordError.style.display = "block"; // Show error message
          passwordError.textContent = "Passwords do not match. Please try again.";
      } else {
          passwordError.style.display = "none"; // Hide error message
      }
  }
}


function handleRegisterForm() {
  const regUsernameInput = document.getElementById("regUsername");
  const emailInput = document.getElementById("email");
  const regPasswordInput = document.getElementById("regPassword");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const registerForm = document.getElementById("registerFormContent");
  const registerModal = document.getElementById("registerModal");

  // Load saved registration details on page load
  regUsernameInput.value = localStorage.getItem("regUsername") || "";
  emailInput.value = localStorage.getItem("email") || "";

  // Save registration details when inputs change
  regUsernameInput.addEventListener("input", saveRegistrationDetails);
  emailInput.addEventListener("input", saveRegistrationDetails);

    
  function saveRegistrationDetails() {
    // Save to localStorage if needed
    localStorage.setItem("regUsername", regUsernameInput.value.trim());
    localStorage.setItem("email", emailInput.value.trim());
      console.log("Registration details saved");
  }

  // Clear registration details on successful form submission
  registerForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent default submission for testing

      // Clear local storage
      localStorage.removeItem("regUsername");
      localStorage.removeItem("email");

      // Clear form fields
      regUsernameInput.value = "";
      emailInput.value = "";
      regPasswordInput.value = "";
      confirmPasswordInput.value = "";

      // Hide the register modal
      registerModal.style.display = "none";

      console.log("Registration successful! Fields cleared and modal closed.");
      alert("Registration successful!");
  });
}




document.addEventListener("DOMContentLoaded", () => {
  handleRegisterForm();
  checkBoxx(); 
  handlePasswordValidation();
});


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

 // Check if elements exist
if (!contactForm || !emailInput || !errorMessage) {
  console.error("One or more elements not found in the DOM.");
} else {
  contactForm.addEventListener('submit', (event) => {
      const email = emailInput.value.trim(); // Trim whitespace

      if (sentEmails.has(email)) {
          event.preventDefault();
          errorMessage.textContent = `Email has already been sent to ${email}`;
          errorMessage.style.color = '#B80000';
          errorMessage.style.fontWeight = 'bold';
      } else if (emailInput.validity.valid) {
          // If the email is valid and hasn't been sent, submit the form and add the email to the set
          sentEmails.add(email);
          alert('Message sent!');
      } else {
          event.preventDefault();
          errorMessage.textContent = 'Please enter a valid email address';
      }
  });
}

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


document.addEventListener('DOMContentLoaded', () => {
  var typed = new Typed('.span__ri', {
      strings: ["First sentence.", "Second sentence."],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true
  });
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
// Validate if the command starts with "Chatbot"
function removeEmoji(str) {
  return str.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E6}-\u{1F1FF}]/gu, '');
}

function isValidCommand(str) {
  return str.toLowerCase().startsWith("chatbot");
}

document.getElementById('chatBot').addEventListener('click', async () => {
  const userInput = document.getElementById('userInput').value;
  const cleanInput = removeEmoji(userInput);

  // Check if message starts with "Chatbot"
  if (isValidCommand(cleanInput)) {
    // Now check if message contains any greeting
    const greetings = ["hello", "hi", "habari", "hey"];
    
    // If message contains any of the greetings
    if (greetings.some(greeting => cleanInput.toLowerCase().includes(greeting))) {
      document.getElementById('response').textContent = "Hello, how can I help you?";
    }
    // If message contains "bye"
    else if (cleanInput.toLowerCase().includes("bye")) {
      document.getElementById('response').textContent = "Goodbye! Have a great day!";
    }
    // If message doesn't contain a greeting, but starts with "Chatbot"
    else {
      document.getElementById('response').textContent = "Hello, how can I assist you today?";
      
    }
  } else {
    document.getElementById('response').textContent = 'Please start your message with "Chatbot".';
  }

  document.getElementById('userInput').value = '';
});




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
    
   