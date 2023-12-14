document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector(".backToTopBtn");

  // Show/hide the button based on scroll position
  window.onscroll = function () {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      button.style.display = "block";
    } else {
      button.style.display = "none";
    }
  };

  // Smooth scroll to the top
  button.addEventListener("click", function () {
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
  });
});
