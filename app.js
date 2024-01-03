const hiddenElements = document.querySelectorAll(".hidden");

// The observer checks for changes in the visibility of the selected elements and,
// anytime it detects a change, adds a class 'show' to them, which can then be manipulated via CSS.
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log("entry");
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});

hiddenElements.forEach((el) => observer.observe(el));
