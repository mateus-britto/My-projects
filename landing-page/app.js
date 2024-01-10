document.querySelectorAll(".youtube-container").forEach((container) => {
  const playButton = container.querySelector(".play-button");
  playButton.addEventListener("click", () => {
    const videoId = container.dataset.videoId;
    const iframe = document.createElement("iframe");
    iframe.setAttribute(
      "src",
      `https://www.youtube.com/embed/${videoId}?autoplay=1`
    );
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "true");
    container.innerHTML = "";
    container.appendChild(iframe);
  });
});
