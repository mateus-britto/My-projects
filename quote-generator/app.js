const button = document.querySelector(".generator");
const quote = document.querySelector(".quote");
const author = document.querySelector(".author");

function getRandomQuote() {
  // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
  fetch("https://api.quotable.io/random")
    .then((response) => response.json())
    .then((data) => {
      // Display the quote on the webpage
      quote.innerText = `"${data.content}"`;
      author.innerText = data.author;
    })
    .catch((error) => {
      console.error("Error fetching quote:", error);
    });
}

button.addEventListener("click", () => {
  getRandomQuote();
});
