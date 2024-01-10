fetch("https://dragonball-api.com/api/characters/1")
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById("api-data");
    const description = document.createElement("p");
    description.textContent = data.description;

    container.appendChild(description);
  })
  .catch((error) => console.error("Error:", error));

const generateBtn = document.createElement("button");
