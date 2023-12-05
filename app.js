const lines = document.querySelectorAll(".fade-in-text span");

lines.forEach((line, index) => {
  line.style.animationDelay = `${index * 2}s`; // Adjust the delay as needed
});
