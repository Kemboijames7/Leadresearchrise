
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

