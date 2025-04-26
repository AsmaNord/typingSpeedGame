const quotes = [
    'HTML is the backbone of web pages, defining structure with elements like headings, paragraphs, and links.',

    'CSS is a styling language that controls colors, layouts, and animations for beautiful web designs.',

    'JavaScript is a programming language that brings interactivity to websites, handling events, animations, and logic.',

    'An API is a set of rules that allows applications to communicate and exchange data efficiently.',

    'The frontend is the part of a website users interact with, built using HTML, CSS, and JavaScript.',

    'The backend is the server-side of an application, managing databases, authentication, and business logic.',

    'The DOM, or Document Object Model, represents web pages as a structured tree for dynamic content updates.',

    'SEO, or Search Engine Optimization, improves website visibility by optimizing content and structure.',

    'Responsive design is a web approach ensuring sites look great on all screen sizes and devices.',

    'Web hosting is a service that stores website files and makes them accessible on the internet.'
];

let words = [];
let wordIndex = 0;

// the starting time
let startTime = Date.now();

// page elements
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');

// Start logic
document.getElementById('start').addEventListener('click', () => {
    // get a quote
    const quoteIndex = Math.floor(Math.random() * quotes.length); //Math.random() always returns a number lower than 1. // Math floor rounds the number to the nearest int //we use * n so we can specify the range of hte int else it'll always return 0 ex Math.floor(0.12)=0
    const quote = quotes[quoteIndex];
    // Put the quote into an array of words
    words = quote.split(' ');
    // reset the word index for tracking
    wordIndex = 0;
  
    // UI updates
    // Create an array of span elements so we can set a class
    const spanWords = words.map(function(word) { return `<span>${word} </span>`}); // .map() is a method that applay a function on every value of an array
    // Convert into string and set as innerHTML on quote display
    quoteElement.innerHTML = spanWords.join('');
    // Highlight the first word
    quoteElement.childNodes[0].className = 'highlight';
    // Clear any prior messages
    messageElement.innerText = '';
  
    // Setup the textbox
    // Clear the textbox
    typedValueElement.value = '';
    // set focus
    typedValueElement.focus();
    // set the event handler
  
    // Start the timer
    startTime = new Date().getTime();

    quoteElement.style.display = 'block'; // modifying the css from display='non' to 'block'
    
    messageElement.style.display = 'none';
});

// Typing logic
typedValueElement.addEventListener('input', () => {
    // Get the current word
    const currentWord = words[wordIndex];
    // get the current value
    const typedValue = typedValueElement.value;
  
    if (typedValue === currentWord && wordIndex === words.length - 1) {
      // end of sentence
      // Display success
      const elapsedTime = new Date().getTime() - startTime;
      const message = `CONGRATULATIONS! You finished in ${elapsedTime / 1000} seconds.`;
      messageElement.innerText = message;
      messageElement.style.display = 'block'; // It was 'none' in css so the style won't be displayed
    } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
      // end of word
      // clear the typedValueElement for the new word
      typedValueElement.value = '';
      // move to the next word
      wordIndex++;
      // reset the class name for all elements in quote
      for (const wordElement of quoteElement.childNodes) {
        wordElement.className = '';
      }
      // highlight the new word
      quoteElement.childNodes[wordIndex].className = 'highlight';
    } else if (currentWord.startsWith(typedValue)) {
      // currently correct
      // highlight the next word
      typedValueElement.className = '';
    } else {
      // error state
      typedValueElement.className = 'error';
    }
  });